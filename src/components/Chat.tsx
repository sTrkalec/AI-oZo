"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { useChat } from "ai/react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "http://localhost:3000/api/chat",
  });



  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-[400px] h-[700px] grid grid-rows-[min-content_1fr_min-content] ">
        <CardHeader>
          <CardTitle>Chat AI</CardTitle>
          <CardDescription>Teste</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {messages.map((message, index) => (
            <div key={message.id} className="flex gap-2 text-slate-600 text-sm">
              {message.role === "user" && (
                <Avatar>
                  <AvatarFallback>GM</AvatarFallback>
                  <AvatarImage src="https://github.com/strkalec.png" />
                </Avatar>
              )}

              {message.role === "assistant" && (
                <Avatar>
                  <AvatarFallback>oZo</AvatarFallback>
                  <AvatarImage src="https://yt3.googleusercontent.com/tVG0-2yEdwYOoJ8megnWm42zTfB1J3jE7QnJnXeTngJSRk2qR3hmiBi8f1XcEDwXFy-0RXbXsQ=s176-c-k-c0x00ffffff-no-rj" />
                </Avatar>
              )}

              <p className="leading-relaxed">
                <span className="block font-bold text-slate-700">
                  {message.role === "user" ? "Você" : "oZo"}
                </span>
                {message.content}
              </p>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <form className="w-full flex gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Digite sua mensagem"
              value={input}
              onChange={handleInputChange}
            />
            <Button type="submit">Enviar</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
