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
import { ScrollArea } from "./ui/scroll-area";
import React, { useEffect, useRef } from "react";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "http://localhost:3000/api/chat",
  });

  const bottomRef = useRef<HTMLDivElement>(null); // Specify the type here

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); // Use optional chaining here
  }, [messages]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Card className="w-[400px]">
        <CardHeader className="text-center mb-3">
          <CardTitle>Chat oZo</CardTitle>
          <CardDescription>Usando Vercel SDK para criar chat bot</CardDescription>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[640px]">

            {messages.map((message, index) => (
              <div key={message.id} className="flex gap-2 text-slate-600 text-sm pb-5">
                {message.role === "user" && (
                  <Avatar>
                    <AvatarFallback>GM</AvatarFallback>
                    <AvatarImage src="https://github.com/strkalec.png" />
                  </Avatar>
                )}

                {message.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>oZo AI</AvatarFallback>
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

            {
              messages.length === 0 && (
                <CardContent className="h-[640px] flex items-center justify-center">
                  <p className="text-center text-slate-600 font-bold">
                    Envie uma mensagem para iniciar a conversa
                  </p>
                </CardContent>
              )
            }

            <div ref={bottomRef} />

          </ScrollArea>

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
