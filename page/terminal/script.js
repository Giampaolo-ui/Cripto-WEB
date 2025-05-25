 cmd = document.getElementById("cmd");
 input = document.getElementById("input");
 log = (text) => {
  cmd.textContent += text + "\n";
  cmd.scrollTop = cmd.scrollHeight;
};

let symKey = crypto.getRandomValues(new Uint8Array(16));
let rsaKeyPair;
let lastGeneratedKey = Array.from(symKey)
  .map((b) => b.toString(16).padStart(2, "0"))
  .join("");

 encoder = new TextEncoder();
 decoder = new TextDecoder();

async function generateRSAKeys() {
  rsaKeyPair = await crypto.subtle.generateKey(
    {
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["encrypt", "decrypt"]
  );
  log("🔐 Coppia di chiavi RSA generata!");
}

async function encryptSym(text, keyBytes) {
   key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );
   iv = crypto.getRandomValues(new Uint8Array(12));
   encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(text)
  );
  return { encrypted, iv };
}

async function decryptSym(encrypted, iv, keyBytes) {
   key = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );
   decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );
  return decoder.decode(decrypted);
}

async function encryptRSA(text) {
   encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    rsaKeyPair.publicKey,
    encoder.encode(text)
  );
  return encrypted;
}

async function decryptRSA(encrypted) {
   decrypted = await crypto.subtle.decrypt(
    { name: "RSA-OAEP" },
    rsaKeyPair.privateKey,
    encrypted
  );
  return decoder.decode(decrypted);
}

function arrayBufferToBase64(buffer) {
   bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
   binary = atob(base64);
   bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

let tempData = {};

input.addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
     command = input.value.trim();
    log("> " + command);
    input.value = "";

    if (command === "help") {
      log(
        "Comandi disponibili:\nhelp\ngen-rsa\ngen-sym\nenc-sym [chiave] [testo]\ndec-sym [chiave]\nenc-rsa [testo]\ndec-rsa\nNota: usa %key per inserire l'ultima chiave simmetrica generata."
      );
    } else if (command === "gen-rsa") {
      await generateRSAKeys();
    } else if (command === "gen-sym") {
      symKey = crypto.getRandomValues(new Uint8Array(16));
      lastGeneratedKey = Array.from(symKey)
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      log("🔑 Chiave simmetrica generata: " + lastGeneratedKey);
    } else if (command.startsWith("enc-sym ")) {
       parts = command.slice(8).split(" ");
       keyHex = parts[0] === "%key" ? lastGeneratedKey : parts[0];
       text = parts.slice(1).join(" ");
      try {
         keyBytes = new Uint8Array(
          keyHex.match(/.{1,2}/g).map((b) => parseInt(b, 16))
        );
         result = await encryptSym(text, keyBytes);
        tempData.sym = { ...result, key: keyBytes };
        log("🔒 Testo criptato con AES-GCM (salvato in memoria temporanea)");
        log("Base64: " + arrayBufferToBase64(result.encrypted));
      } catch (err) {
        log(
          "❌ Errore nella chiave. Deve essere una stringa esadecimale di 32 caratteri."
        );
      }
    } else if (command.startsWith("dec-sym")) {
      if (tempData.sym) {
         parts = command.split(" ");
         keyHex = parts[1] === "%key" ? lastGeneratedKey : parts[1];
        try {
           keyBytes = new Uint8Array(
            keyHex.match(/.{1,2}/g).map((b) => parseInt(b, 16))
          );
           result = await decryptSym(
            tempData.sym.encrypted,
            tempData.sym.iv,
            keyBytes
          );
          log("🔓 Testo decriptato: " + result);
        } catch (err) {
          log(
            "❌ Errore nella decriptazione. Verifica la chiave o i dati salvati."
          );
        }
      } else {
        log("⚠️ Nessun dato criptato trovato. Usa prima enc-sym");
      }
    } else if (command.startsWith("enc-rsa ")) {
      if (!rsaKeyPair) {
        log("⚠️ Genera prima le chiavi con gen-rsa");
        return;
      }
       text = command.slice(8);
       result = await encryptRSA(text);
      tempData.rsa = result;
      log("🔒 Testo criptato con RSA-OAEP (salvato in memoria temporanea)");
      log("Base64: " + arrayBufferToBase64(result));
    } else if (command === "dec-rsa") {
      if (tempData.rsa) {
         result = await decryptRSA(tempData.rsa);
        log("🔓 Testo decriptato: " + result);
      } else {
        log("⚠️ Nessun dato criptato trovato. Usa prima enc-rsa");
      }
    } else {
      log("❓ Comando sconosciuto. Usa 'help' per i comandi disponibili.");
    }
  }
});

log(
  "🧪 Benvenuto nel simulatore CMD crittografico!\nDigita 'help' per iniziare."
);
