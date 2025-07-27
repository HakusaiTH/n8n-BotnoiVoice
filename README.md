<p align="center">
<a href="https://www.youtube.com/watch?v=HASUucNBM0w" target="_blank">
<img src="https://img.youtube.com/vi/HASUucNBM0w/0.jpg" alt="Watch videos on YouTube" width="640"/>
</a>
</p>

# 🔊 n8n-BotnoiVoice

Plug-in to connect [Botnoi Voice API](https://voice.botnoi.ai/api-login) to [n8n](https://n8n.io/) to easily use Thai Text-to-Speech (TTS) within n8n Workflow

---

## 📌 Requirements before starting

### 1. Install basic tools

- [Git](https://git-scm.com/downloads)
- Node.js version **20 and above**
- Recommended to install via [nvm](https://github.com/nvm-sh/nvm) (Linux, Mac, WSL)
- For Windows, see [Microsoft Docs](https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows) for installation instructions
- Install n8n:

```bash
npm install -g n8n
````

---

## 🚀 How to use the plugin

### ✅ Install from npm (recommended)

1. Create a custom n8n folder:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
```

2. Install the plugin:

```bash
npm install @phoovadet.noobdev/n8n-botnoi-voice
```

3. Start using:

```bash
n8n start
```

> 💡 Search for node by name in `.ts` file, e.g. `Botnoitts`

---

### 🛠️ Install locally (if cloning repo)

1. Install globally:

```bash
npm install -g n8n
```

2. Build and connect locally:

```bash
npm run build
npm link
```

3. Connect to n8n instance:

```bash
mkdir -p ~/.n8n/custom
cd ~/.n8n/custom
npm init -y
npm link n8n-botnoi-voice
```

4. Start using:

```bash
n8n start
```

---

## 🔐 Get API Key from Botnoi Voice

1. Go to: [https://voice.botnoi.ai/api-login](https://voice.botnoi.ai/api-login)
2. Login / Sign up
3. Click **Generate API Key** button

![Generate API Key](https://github.com/user-attachments/assets/53cae275-c947-49ac-aa5f-49c224914da9)

4. Copy API Key to use in n8n

---

## ⚙️ Add API Key in n8n

1. Open n8n and go to **Credentials** menu
2. Select **New Credential** → Select Botnoi Voice
3. Paste the obtained API Key

![Add API Key](https://github.com/user-attachments/assets/7ddb26c4-2241-420f-8212-5096e1e052c5)
![Credential Page](https://github.com/user-attachments/assets/2d5a905a-7f46-4447-a5fe-aa682a318621)

> ✅ If the key is correct, it will say “Connection tested successfully”

---

## 🧾 Usage

### 1. Enter the text you want to convert

![Text Input](https://github.com/user-attachments/assets/a20ee802-7ecb-4005-bc18-7ffe18e2ac92)

* Select the `Botnoi TTS` node
* Enter the text in the `Text` field or use Expression For example `{{ $json.output }}`

---

### 2. Select the speaker's voice

![Speaker](https://github.com/user-attachments/assets/1628e724-a7c6-4f76-a203-dad037eca3a4)

* Supports over 300 voices, such as Eva, John, Thai, Japanese, Vietnamese, etc.

---

### 3. Select the language that suits the text

![Language](https://github.com/user-attachments/assets/8fb5380f-f4b2-48cf-89f6-03d77e8679d4)

* Select a language in the `Language` field, such as `Thai`, `English`, `Japanese`, etc.

---

### 4. Create a sound by pressing Execute

![Execute](https://github.com/user-attachments/assets/06ecb4b4-cd85-45a2-b99e-6db17f63f443)

* Click **Execute Step**
* The sound file will be generated and display `audio_url` for listening or downloading

---

## 🤖 Example Workflow with OpenAI and Agent

![Workflow Example](https://github.com/user-attachments/assets/940067f7-8240-41af-9582-22692509733f)

1. Message from user → to Agent
2. Agent processes → send to OpenAI
3. Retrieve response → send to Botnoi TTS → get audio file

---

## 🧠 Use Expression with value from JSON

![Expression](https://github.com/user-attachments/assets/0e7cac89-cd77-42da-bea9-e979cb021bb4)

* Use `{{ $json.output }}` to use value from previous Node
* Suitable for automation system that pull value from AI or API

---

## 📚 More information

* Documentation for creating Node for n8n: 
[https://docs.n8n.io/integrations/creating-nodes/](https://docs.n8n.io/integrations/creating-nodes/)

---

## 📝 License

[MIT License](https://github.com/n8n-io/n8n-nodes-starter/blob/master/LICENSE.md)
