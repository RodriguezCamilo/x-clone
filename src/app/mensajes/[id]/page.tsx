import Chat from "@/app/components/messages/chat";
import NavBar from "@/app/components/navbar/navbar";

function ChatId({ params }: any) {
  const { id } = params;
  return (
    <body className="min-h-screen w-full flex flex-col md:flex-row text-white bg-black">
      <header className="z-30 md:w-[8%] md:min-w-[8%] xl:min-w-[30%]">
        <NavBar />
      </header>
      <main className="bg-black flex w-full">
        <Chat conversationId={id} />
      </main>
    </body>
  );
}

export default ChatId;
