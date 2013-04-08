<?php

// Register class loader
require_once __DIR__.'/lib/symfony/src/Symfony/Component/ClassLoader/UniversalClassLoader.php';
$loader = new Symfony\Component\ClassLoader\UniversalClassLoader();
$loader->registerNamespace('Symfony', __DIR__.'/lib/symfony/src');
$loader->register();

// Read build file
$build = Symfony\Component\Yaml\Yaml::parse(__DIR__.'/build.yml');

// Build components
mkdir(__DIR__."/../build/components", 0777, true);
foreach ($build['components'] as $componentName) {
    // Compute component source path
    $componentSourcePath = __DIR__."/../src/$componentName.js";

    // Build raw
    file_put_contents(
        __DIR__."/../build/components/$componentName.js",
        render(__DIR__.'/copyright.php', array('content' => file_get_contents($componentSourcePath)))
    );

    // Build minified
    file_put_contents(
        __DIR__."/../build/components/$componentName-min.js",
        render(__DIR__.'/copyright.php', array('content' => compress(file_get_contents($componentSourcePath))))
    );
}

// Build rollups
mkdir(__DIR__.'/../build/rollups', 0777, true);
foreach ($build['rollups'] as $rollupName => $components) {
    // Compute component source paths
    $componentSourcePaths = array_map(function ($componentName) {
        return __DIR__."/../src/$componentName.js";
    }, $components);

    // Get component source contents
    $componentSourceContents = implode('', array_map('file_get_contents', $componentSourcePaths));

    // Build rollup
    file_put_contents(
        __DIR__."/../build/rollups/$rollupName.js",
        render(__DIR__.'/copyright.php', array('content' => compress($componentSourceContents)))
    );
}

function render($__template__, $__params__)
{
    extract($__params__);

    ob_start();
    include $__template__;
    $content = ob_get_clean();

    return $content;
}

function compress($jsContent)
{
    // Open process
    $cmd = 'java -jar "'.__DIR__.'/bin/compiler/compiler.jar"';
    $descriptors = array(
        0 => array('pipe', 'r'),
        1 => array('pipe', 'w'),
        2 => array('pipe', 'w')
    );
    $process = proc_open($cmd, $descriptors, $pipes);
    if ($process === false) {
        die('proc_open failed');
    }

    // Write raw
    fwrite($pipes[0], $jsContent);
    fclose($pipes[0]);

    // Read compressed
    $compressed = stream_get_contents($pipes[1]);
    fclose($pipes[1]);

    // Check errors
    $errors = stream_get_contents($pipes[2]);
    fclose($pipes[2]);
    $exitStatus = proc_close($process);
    if ($errors != '' or $exitStatus != 0) {
        die('errors or exit status failed');
    }

    return $compressed;
}
