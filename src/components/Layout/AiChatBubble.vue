<template>
  <!-- Chat box -->
  <div v-if="isOpen" class="chat-box">
    <div class="chat-header">
      <span>AI Assistant</span>
      <button @click="toggleChat">✕</button>
    </div>

    <div class="chat-body">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="chat-message"
        :class="msg.sender"
      >
        {{ msg.text }}
      </div>
    </div>

    <div class="chat-footer">
      <input
        type="text"
        v-model="input"
        placeholder="Type your message and press Enter..."
        @keydown.enter="sendMessage"
      />
    </div>
  </div>

  <!-- Floating bubble -->
  <button class="chat-bubble" @click="toggleChat">
    <i class="bi bi-chat-dots"></i>
  </button>
</template>

<script>
import { ref, nextTick } from "vue";
import axiosService from '../service/axiosService';

export default {
  setup() {
    const isOpen = ref(false);
    const input = ref("");

    const messages = ref([
      {
        sender: "assistant",
        text: "Hi 👋 I’m your AI Assistant. How can I help you today?",
      },
    ]);

    const toggleChat = () => {
      isOpen.value = !isOpen.value;
    };

    const scrollToBottom = async () => {
      await nextTick();
      const chatBody = document.querySelector(".chat-body");
      if (chatBody) {
        chatBody.scrollTop = chatBody.scrollHeight;
      }
    };

    const sendMessage = async () => {
      if (!input.value.trim()) return;

      // User message
      messages.value.push({
        sender: "user",
        text: input.value,
      });

      input.value = "";
      await scrollToBottom();

      // AI reply
      setTimeout(async () => {
        const reply = await axiosService.postAichat(
          messages.value.at(-1).text,
          messages.value.length === 2 ? 0 : 1
        );

        messages.value.push({
          sender: "assistant",
          text: reply,
        });

        await scrollToBottom();
      }, 600);
    };

    return {
      isOpen,
      input,
      messages,
      toggleChat,
      sendMessage,
    };
  },
};
</script>


<style scoped>
/* Floating bubble */
.chat-bubble {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
}

.chat-bubble i {
  font-size: 24px;
  color: #000;
}

.chat-bubble:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.chat-bubble:hover i {
  color: #ff3200;
}

/* Chat box */
.chat-box {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 320px;
  height: 380px;
  background-color: #ffffff;
  border-radius: 10px;

  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.chat-header {
  padding: 12px 16px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-weight: 500;
}

.chat-header button {
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #000;
}

.chat-header button:hover {
  color: #ff3200;
}

/* Body */
.chat-body {
  flex: 1;
  padding: 16px;
  font-size: 14px;
  overflow-y: auto;
}

/* Footer */
.chat-footer {
  padding: 10px;
  border-top: 1px solid #eee;
}

.chat-footer input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.chat-footer input:focus {
  outline: none;
  border-color: #ff3200;
}

.chat-message {
  margin-bottom: 8px;
  padding: 8px 10px;
  border-radius: 8px;
  max-width: 80%;
  font-size: 14px;
}

/* User message */
.chat-message.user {
  background-color: #f5f5f5;
  align-self: flex-end;
  margin-left: auto;
}
.chat-message.assistant {
  background-color: #ffffff;
  border: 1px solid #eee;
  align-self: flex-start;
}
</style>
