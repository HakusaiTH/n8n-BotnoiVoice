# 🔊 n8n-BotnoiVoice

ปลั๊กอินสำหรับเชื่อมต่อ [Botnoi Voice API](https://voice.botnoi.ai/api-login) กับ [n8n](https://n8n.io/) เพื่อใช้งาน Text-to-Speech (TTS) ภาษาไทยภายใน Workflow ของ n8n ได้อย่างง่ายดาย

---

## 📌 ความต้องการก่อนเริ่มใช้งาน

### 1. ติดตั้งเครื่องมือพื้นฐาน

- [Git](https://git-scm.com/downloads)
- Node.js เวอร์ชัน **20 ขึ้นไป**
  - แนะนำติดตั้งผ่าน [nvm](https://github.com/nvm-sh/nvm) (Linux, Mac, WSL)
  - สำหรับ Windows ดูวิธีติดตั้งจาก [Microsoft Docs](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
- ติดตั้ง n8n:

```bash
npm install -g n8n
````

---

## 🚀 วิธีใช้งานปลั๊กอิน

### ✅ ติดตั้งจาก npm (แนะนำ)

1. สร้างโฟลเดอร์ custom ของ n8n:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
```

2. ติดตั้งปลั๊กอิน:

```bash
npm install @phoovadet.noobdev/n8n-botnoi-voice
```

3. เริ่มใช้งาน:

```bash
n8n start
```

> 💡 ค้นหา node ด้วยชื่อในไฟล์ `.ts` เช่น `Botnoitts`

---

### 🛠️ ติดตั้งแบบ local (ถ้า clone repo)

1. ติดตั้งแบบ global:

```bash
npm install -g n8n
```

2. สร้าง build และเชื่อมแบบ local:

```bash
npm run build
npm link
```

3. เชื่อมเข้ากับ n8n instance:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
npm link n8n-botnoi-voice
```

4. เริ่มใช้งาน:

```bash
n8n start
```

---

## 🔐 การรับ API Key จาก Botnoi Voice

1. ไปที่: [https://voice.botnoi.ai/api-login](https://voice.botnoi.ai/api-login)
2. ลงชื่อเข้าใช้ / สมัครสมาชิก
3. คลิกปุ่ม **สร้าง API Key**

![Generate API Key](https://github.com/user-attachments/assets/53cae275-c947-49ac-aa5f-49c224914da9)

4. คัดลอก API Key สำหรับใช้ใน n8n

---

## ⚙️ เพิ่ม API Key ใน n8n

1. เปิด n8n และไปที่เมนู **Credentials**
2. เลือก **New Credential** → เลือก Botnoi Voice
3. วาง API Key ที่ได้มา

![Add API Key](https://github.com/user-attachments/assets/7ddb26c4-2241-420f-8212-5096e1e052c5)
![Credential Page](https://github.com/user-attachments/assets/2d5a905a-7f46-4447-a5fe-aa682a318621)

> ✅ ถ้า Key ถูกต้องจะขึ้นว่า “Connection tested successfully”

---

## 🧾 การใช้งาน

### 1. กรอกข้อความที่ต้องการแปลงเสียง

![Text Input](https://github.com/user-attachments/assets/a20ee802-7ecb-4005-bc18-7ffe18e2ac92)

* เลือก node `Botnoi TTS`
* กรอกข้อความในช่อง `Text` หรือใช้ Expression เช่น `{{ $json.output }}`

---

### 2. เลือกเสียงผู้พูด

![Speaker](https://github.com/user-attachments/assets/1628e724-a7c6-4f76-a203-dad037eca3a4)

* รองรับเสียงกว่า 300 แบบ เช่น Eva, John, เสียงภาษาไทย, ญี่ปุ่น, เวียดนาม ฯลฯ

---

### 3. เลือกภาษาให้เหมาะกับข้อความ

![Language](https://github.com/user-attachments/assets/8fb5380f-f4b2-48cf-89f6-03d77e8679d4)

* เลือกภาษาในช่อง `Language` เช่น `Thai`, `English`, `Japanese` ฯลฯ

---

### 4. สร้างเสียงโดยกด Execute

![Execute](https://github.com/user-attachments/assets/06ecb4b4-cd85-45a2-b99e-6db17f63f443)

* คลิก **Execute Step**
* ไฟล์เสียงจะถูกสร้างและแสดง `audio_url` สำหรับฟังหรือดาวน์โหลด

---

## 🤖 ตัวอย่าง Workflow ร่วมกับ OpenAI และ Agent

![Workflow Example](https://github.com/user-attachments/assets/940067f7-8240-41af-9582-22692509733f)

1. ข้อความจากผู้ใช้ → ไปยัง Agent
2. Agent ประมวลผล → ส่งไป OpenAI
3. ดึงข้อความตอบกลับ → ส่งเข้า Botnoi TTS → ได้ไฟล์เสียง

---

## 🧠 ใช้ Expression กับค่าจาก JSON

![Expression](https://github.com/user-attachments/assets/0e7cac89-cd77-42da-bea9-e979cb021bb4)

* ใช้ `{{ $json.output }}` เพื่อใช้ค่าจาก Node ก่อนหน้า
* เหมาะกับระบบอัตโนมัติที่ดึงค่าจาก AI หรือ API

---

## 📚 ข้อมูลเพิ่มเติม

* เอกสารการสร้าง Node สำหรับ n8n:
  [https://docs.n8n.io/integrations/creating-nodes/](https://docs.n8n.io/integrations/creating-nodes/)

---

## 📝 License

[MIT License](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
