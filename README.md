# Node.js WebSocket Example

這個範例展示了如何使用Node.js和WebSocket來建立一個簡單的即時通訊應用程序。

## 安裝

1. 確保你已經安裝了Node.js。如果沒有，可以從[Node.js官方網站](https://nodejs.org/)下載並安裝。

2. 安裝必要的Node.js套件。在你的專案目錄中，運行：

    ```
    npm install
    ```

    這將會根據`package.json`文件安裝所有需要的依賴。

## 運行服務器

在你的專案目錄中，運行：

```
node server.js
```


這將會啟動WebSocket服務器，它將在端口4000上監聽連接。

## 開啟客戶端

在瀏覽器中打開`index.html`文件。你可以使用這個簡單的HTML頁面來測試服務器。

每次你點擊"Send Message"按鈕時，一條消息將會被發送到服務器，然後服務器將會返回一個回應。

## 心跳檢查

在這個範例中，我們也實現了一個簡單的心跳檢查機制。服務器將定期向客戶端發送一個'ping'消息，然後客戶端將會回應一個'pong'消息。

## 測試

1. 確保你已經啟動了WebSocket服務器。

2. 在瀏覽器中打開`index.html`文件。

3. 點擊"Send Message"按鈕，然後檢查瀏覽器的開發者控制台以查看日誌。

4. 在服務器的控制台，你也可以看到被發送和接收到的消息的日誌。

## 關於攔截本地 WebSocket 流量的特別說明:

當您嘗試使用 Burp Suite 之類的工具攔截本地機器上的 WebSocket 流量時，如果您直接連接到 `localhost` 或 `127.0.0.1`，可能會遇到困難。這是因為許多應用程序（包括瀏覽器）通常會為本地地址繞過代理設置。

解決此限制的一種策略是編輯系統的 `hosts` 文件。通過將域（如 `websocket.local`）映射到 `127.0.0.1`，您創建了一個看似遠程的連接點，實際上它指向您的本地機器。由於此域名不是明確的本地地址（如 `localhost`），瀏覽器可能會通過代理發送流量，使您能夠在 Burp Suite 等工具中捕獲它。

修改 `hosts` 文件的主要目的是為了欺騙瀏覽器，使其將看似遠程的流量通過代理，即使該流量實際上是本地的。
```
127.0.0.1 websocket.localtest001
```

## 文件結構

- `server.js`: 這是Node.js WebSocket服務器的主要文件。
- `index.html`: 這是一個簡單的HTML頁面，用於測試WebSocket服務器。
- `package.json`: 這個文件包含了這個專案的元數據，以及它的依賴。

## 依賴

- [ws](https://www.npmjs.com/package/ws): 這是一個簡單的Node.js WebSocket庫。