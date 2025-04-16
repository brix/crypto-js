/**
 * Copyright (C) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, TestType } from '@ohos/hypium'
import { CryptoJS } from '@ohos/crypto-js'
import { KeyIVData,IVData} from "./interface/interface"

export default function telephonyPerfJsunit(){
  describe("telephonyPerfJsunit", ()=>{
    const BASE_COUNT=2000
    const HTTP_COUNT=2
    const BASELINE_HASSIMECASR=500
    const BASELINE_CREATEHTTP=500
    const BASELINE_REQUEST=2500
    const BASELINE_DESTROY=30
    let data:KeyIVData | null = null

    it("TripleDES", TestType.PERFORMANCE, async (done:Function)=> {
      let startTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_TripleDES startTime:"+startTime);

      for (let index = 0; index < BASE_COUNT; index++) {
        if (data) {
          let options: IVData = {
            iv: data.iv
          }
          CryptoJS.algo.TripleDES.createEncryptor(data.key,options).finalize() + '';
        }
      }

      let endTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_TripleDES endTime:"+endTime);

      let averageTime=((endTime-startTime)*1000)/BASE_COUNT
      console.log("Telephony_Http_CreateHttp_Perf_0100_TripleDES averageTime:"+averageTime+"μs");
      expect(averageTime<BASELINE_CREATEHTTP).assertTrue();
      done()
    });


    it("padPkcs7", TestType.PERFORMANCE, async (done:Function)=> {
      let startTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padPkcs7 startTime:"+startTime);

      for (let index = 0; index < BASE_COUNT; index++) {
        let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddd00], 3);
        CryptoJS.pad.Pkcs7.pad(data, 2);
      }

      let endTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padPkcs7 endTime:"+endTime);

      let averageTime=((endTime-startTime)*1000)/BASE_COUNT
      console.log("Telephony_Http_CreateHttp_Perf_0100_padPkcs7 averageTime:"+averageTime+"μs");
      expect(averageTime<BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("padAnsiX923", TestType.PERFORMANCE, async (done:Function)=> {
      let startTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padAnsiX923 startTime:"+startTime);

      for (let index = 0; index < BASE_COUNT; index++) {
        let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddddd, 0xdddddddd], 3);

        CryptoJS.pad.AnsiX923.pad(data, 2);
      }

      let endTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padAnsiX923 endTime:"+endTime);

      let averageTime=((endTime-startTime)*1000)/BASE_COUNT
      console.log("Telephony_Http_CreateHttp_Perf_0100_padAnsiX923 averageTime:"+averageTime+"μs");
      expect(averageTime<BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("padIso10126", TestType.PERFORMANCE, async (done:Function)=> {
      let startTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padIso10126 startTime:"+startTime);

      for (let index = 0; index < BASE_COUNT; index++) {
        let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddd00], 3);

        CryptoJS.pad.Iso10126.pad(data, 2);
      }

      let endTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padIso10126 endTime:"+endTime);

      let averageTime=((endTime-startTime)*1000)/BASE_COUNT
      console.log("Telephony_Http_CreateHttp_Perf_0100_padIso10126 averageTime:"+averageTime+"μs");
      expect(averageTime<BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("padIso97971", TestType.PERFORMANCE, async (done:Function)=> {
      let startTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padIso97971 startTime:"+startTime);

      for (let index = 0; index < BASE_COUNT; index++) {
        let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddd00], 3);
        CryptoJS.pad.Iso97971.pad(data, 2);      }

      let endTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padIso97971 endTime:"+endTime);

      let averageTime=((endTime-startTime)*1000)/BASE_COUNT
      console.log("Telephony_Http_CreateHttp_Perf_0100_padIso97971 averageTime:"+averageTime+"μs");
      expect(averageTime<BASELINE_CREATEHTTP).assertTrue();
      done()
    });

    it("padZeroPadding", TestType.PERFORMANCE, async (done:Function)=> {
      let startTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padZeroPadding startTime:"+startTime);

      for (let index = 0; index < BASE_COUNT; index++) {
        let data:CryptoJS.lib.WordArray = CryptoJS.lib.WordArray.create([0xdddddd00], 3);
        CryptoJS.pad.ZeroPadding.pad(data, 2);
      }

      let endTime=new Date().getTime()
      console.log("Telephony_Http_CreateHttp_Perf_0100_padZeroPadding endTime:"+endTime);

      let averageTime=((endTime-startTime)*1000)/BASE_COUNT
      console.log("Telephony_Http_CreateHttp_Perf_0100_padZeroPadding averageTime:"+averageTime+"μs");
      expect(averageTime<BASELINE_CREATEHTTP).assertTrue();
      done()
    });

  })
}