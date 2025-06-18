<p align="center">   
  <img align="center" src="https://docs.keploy.io/img/keploy-logo-dark.svg?s=200&v=4" height="40%" width="40%"  alt="keploy logo"/>  
</p> 

<h3 align="center"> 
  <b> ⚡️ KEPLOY STARGAZERS SCRIPT ⚡️ </b> 
</h3>  

## Description 
The **Stargazers Script** is a simple tool built using HTML, CSS, and JavaScript to fetch stargazers of a GitHub repository in real time using the GitHub API token. It allows users to input the repository URL and GitHub token, then provides two options: 
- Fetch all stargazers 
- Fetch stargazers from the last 24 hours  

Once the data is fetched, users can export and download the results as a CSV or an Excel (`.xlsx`) file.  

---

## 🔑 Getting Your GitHub Personal Access Token

To use this tool, you'll need a GitHub Personal Access Token. Follow these steps to create one:

### Step 1: Navigate to GitHub Settings
1. Go to [GitHub.com](https://github.com) and sign in to your account
2. Click on your profile picture in the top-right corner
3. Select **"Settings"** from the dropdown menu

### Step 2: Access Developer Settings
1. Scroll down in the left sidebar and click **"Developer settings"**
2. Click on **"Personal access tokens"**
3. Select **"Tokens (classic)"**

### Step 3: Generate New Token
1. Click the **"Generate new token"** button
2. Select **"Generate new token (classic)"**
3. You may be prompted to confirm your password

### Step 4: Configure Token Settings
1. **Note**: Give your token a descriptive name (e.g., "Stargazers Script")
2. **Expiration**: Choose an expiration date (recommended: 30-90 days for security)
3. **Select scopes**: For this script, you need the following permissions:
   - ✅ **`public_repo`** - Access public repositories
   - ✅ **`read:user`** - Read user profile data
   - ✅ **`user:email`** - Access user email addresses

### Step 5: Generate and Copy Token
1. Click **"Generate token"** at the bottom
2. **⚠️ IMPORTANT**: Copy the token immediately and store it securely
3. You won't be able to see the token again once you leave the page

### 🔒 Token Security Best Practices
- **Never share your token** with anyone or commit it to version control
- **Use environment variables** or secure storage for tokens in production
- **Set reasonable expiration dates** and regenerate tokens regularly
- **Use minimal required scopes** for better security
- **Revoke unused tokens** from your settings page

### 📝 Token Format
Your token will look like this: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 🚀 Using Multiple Tokens
For better rate limiting, you can use multiple tokens separated by commas:
```
ghp_token1, ghp_token2, ghp_token3
```

---

## 🛠️ Setup and Installation 

### 1️⃣ Fork and Clone the Repository 
```sh 
git clone https://github.com/YOUR_USERNAME/stargazers-script.git 
``` 

### 2️⃣ Move into the Project Folder 
```sh 
cd stargazers-script 
``` 

### 3️⃣ Install Dependencies (For Future Next.js Version) 
If the project is updated to Next.js in the future, use: 
```sh 
npm install 
```  

---

## 🚀 Usage

1. **Enter Repository URL**: Paste the GitHub repository URL (e.g., `https://github.com/keploy/keploy`)
2. **Add Your Token**: Paste your Personal Access Token in the token field
3. **Choose Fetch Option**: 
   - Click **"Fetch Stargazers"** for all stargazers
   - Click **"Fetch Last 24H"** for recent stargazers only
4. **Export Data**: Once fetched, download the data as CSV or Excel file

---

## 📂 Folder Structure 
```  
stargazers-script/  
├── index.html      # Main HTML structure  
├── script.js       # JavaScript logic for API calls  
├── styles.css      # Stylesheet for UI 
```  

---

## ⚡ Features

- 🔍 **Real-time Data Fetching** - Get up-to-date stargazer information
- 📊 **Export Options** - Download as CSV or Excel format
- ⏰ **Time Filtering** - Filter stargazers from last 24 hours
- 🔒 **Secure Token Handling** - Your tokens are processed locally
- 🎨 **Clean UI** - Modern, responsive design
- 🚀 **Fast Performance** - Optimized API calls with rate limiting support

---

## 🔧 Troubleshooting

### Common Issues:

**❌ "Authentication failed"**
- Check if your token is valid and not expired
- Ensure you've selected the correct scopes (`public_repo`, `read:user`)

**❌ "Repository not found"**
- Verify the repository URL is correct
- Make sure the repository is public or you have access to it

**❌ "Rate limit exceeded"**
- Use multiple tokens separated by commas
- Wait for the rate limit to reset (usually 1 hour)

---

## 🤝 Contributing 
We welcome contributions! Follow these steps: 
1. **Fork** the repository 
2. **Clone** your fork 
3. **Create a new branch** for your feature    
   ```sh    
   git checkout -b feature-name    
   ``` 
4. **Make your changes and commit**    
   ```sh    
   git add .    
   git commit -m "feat: add feature-name"    
   ``` 
5. **Push the changes to your fork**    
   ```sh    
   git push origin feature-name    
   ``` 
6. **Create a Pull Request** to the main repository  

---

## Community Support ❤️

### 🤔 Questions?
Reach out to us. We're here to help!

[![Slack](https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white)](https://join.slack.com/t/keploy/shared_invite/zt-357qqm9b5-PbZRVu3Yt2rJIa6ofrwWNg)
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/keploy/)
[![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white)](https://www.youtube.com/channel/UC6OTg7F4o0WkmNtSoob34lg)
[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/Keployio)

### 💖 Let's Build Together!
Whether you're a newbie coder or a wizard 🧙‍♀️, your perspective is golden. Take a peek at our:

📜 [Contribution Guidelines](https://github.com/keploy/keploy/blob/main/CONTRIBUTING.md)

❤️ [Code of Conduct](https://github.com/keploy/keploy/blob/main/CODE_OF_CONDUCT.md)


---
## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by the Keploy Team
</p>
