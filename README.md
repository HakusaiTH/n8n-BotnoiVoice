# 🔊 n8n-BotnoiVoice

ปลั๊กอินสำหรับเชื่อมต่อ [Botnoi Voice API](https://voice.botnoi.ai/api-login) กับ [n8n](https://n8n.io/) เพื่อให้สามารถใช้งาน Text-to-Speech (TTS) ภาษาไทยภายใน Workflow ของ n8n ได้อย่างง่ายดาย

---

## 📌 ความต้องการก่อนเริ่มใช้งาน

### ติดตั้งเครื่องมือพื้นฐาน:

* [Git](https://git-scm.com/downloads)
* Node.js เวอร์ชัน **20 ขึ้นไป**

  * แนะนำติดตั้งผ่าน [nvm](https://github.com/nvm-sh/nvm) สำหรับ Linux, Mac, WSL
  * สำหรับ Windows ดูวิธีติดตั้งได้จาก [Microsoft Docs](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
* ติดตั้ง n8n ด้วยคำสั่ง:

  ```bash
  npm install -g n8n
  ```

---

## 🔐 การรับ API Key จาก Botnoi Voice

1. เข้าไปที่เว็บไซต์: [https://voice.botnoi.ai/api-login](https://voice.botnoi.ai/api-login)
2. ลงชื่อเข้าใช้หรือสมัครสมาชิก
3. คลิกปุ่มเพื่อ **สร้าง API Key** ใหม่
   ![Generate API Key](https://github.com/user-attachments/assets/53cae275-c947-49ac-aa5f-49c224914da9)
4. คัดลอก API Key ที่ได้เก็บไว้ใช้งานใน n8n

---

## ⚙️ เพิ่ม API Key ลงใน n8n

1. เปิด n8n ขึ้นมา
2. ไปที่เมนู "Credentials" หรือ "ข้อมูลรับรอง"
3. เพิ่ม Credential ใหม่ของ Botnoi Voice แล้ววาง API Key ที่ได้มา
   ![Add API Key](https://github.com/user-attachments/assets/7ddb26c4-2241-420f-8212-5096e1e052c5)

---

## 🚀 วิธีใช้งานปลั๊กอินนี้

1. Clone โปรเจกต์:

   ```bash
   git clone https://github.com/HakusaiTH/n8n-BotnoiVoice.git
   cd n8n-BotnoiVoice
   ```

2. ติดตั้ง dependencies:

   ```bash
   npm install
   ```

3. เปิดโปรเจกต์ใน editor ที่คุณใช้งาน เช่น VS Code

4. ดูตัวอย่าง node และ credential ได้ที่โฟลเดอร์ `/nodes` และ `/credentials`

5. แก้ไขหรือปรับแต่งเพื่อให้เหมาะกับการใช้งานของคุณ

6. ทดสอบการทำงานด้วย:

   ```bash
   npm run lint       # ตรวจสอบโค้ด
   npm run lintfix    # แก้ไขอัตโนมัติ
   ```

7. ทดสอบ Node แบบ local:

   * ดูวิธีใช้งานได้จาก: [Run your node locally](https://docs.n8n.io/integrations/creating-nodes/test/run-node-locally/)

---

## 📦 การเผยแพร่

หลังจากพัฒนาเสร็จแล้ว สามารถเผยแพร่ node ของคุณไปยัง npm ได้โดยดูขั้นตอนที่นี่:
👉 [Contributing packages to the registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)

---

## 📚 ข้อมูลเพิ่มเติม

* เอกสารการสร้าง Node สำหรับ n8n:
  [https://docs.n8n.io/integrations/creating-nodes/](https://docs.n8n.io/integrations/creating-nodes/)

---

## 📝 License

[MIT License](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)

