export interface chat {
  id: string;
  userEmail: string;
  adminEmail: string;
  messages: {
    senderEmail: String;
    receiverEmail: String;
    message: String;
  };
}
