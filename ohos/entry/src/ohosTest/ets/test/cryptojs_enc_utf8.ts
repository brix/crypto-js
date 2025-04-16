/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
 * Licensed under the MIT License, (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export function testDatasData() {
  // wordArray 值来自原库的函数调用
  const testDatas = [
    {
      name: 'en',
      str: 'en test',
      wordArray: {
        "words": [1701716084, 1702065152], "sigBytes": 7
      }
    },
    {
      name: 'en_punctuation',
      str: "英文符号en_punctuation<>\\/;:'\"][{}=-0987654321`~!@#$%^&*()_+||",
      wordArray: {
        "words": [-393498138, -1769478228, -1494904905, 1701732208, 1970168692, 1969321065, 1869495358, 1546599226, 656563547, 2071805229, 809056311, 909456435, 842096766, 557851428, 626927146, 673799979, 2088501248],
        "sigBytes": 66
      },
    },
    {
      name: 'cn',
      str: '中文测试',
      wordArray: {
        "words": [-457658906, -1769478475, -1947684971], "sigBytes": 12
      },
    },
    {
      name: 'cn_punctuation',
      str: `中文符号cn_punctuation，。、；‘【】、=-0987654321·~！@#￥%……&*（）——+{}|：“《》？`,
      wordArray: {
        "words": [-457658906, -1769478228, -1494904905, 1668177776, 1970168692, 1969321065, 1869541308, -1931247486, -478117393, -1130634624, -1729920880, -478113309, -2139013843, 809056311, 909456435, 842121911, 2129640577, 1076096959, -1524243840, -1495105370, 640348092, -1997554551, -494889758, -2137773189, 2105339836, -1696431972, -478115101, -2138312772, -1627389952],
        "sigBytes": 113
      }
    },
  ];
  return testDatas
}