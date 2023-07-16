"use client";
import React, { useState } from "react";
import {
  CREATEAGENT,
  DEFAULTAVATAR,
  EDIT,
  OFFLINE,
  ONLINE,
} from "@/app/constants";
import UserNav from "@/components/UserNav";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AgentForm from "@/components/AgentForm";

const globalAgentList: IAgent[] = [
  {
    id: "0",
    name: "Michael",
    status: ONLINE,
    avatarUrl: DEFAULTAVATAR,
  },
  {
    id: "1",
    name: "Ben",
    status: ONLINE,
    avatarUrl: DEFAULTAVATAR,
  },
  {
    id: "2",
    name: "Jack",
    status: OFFLINE,
    avatarUrl: DEFAULTAVATAR,
  },
  {
    id: "3",
    name: "Mark",
    status: OFFLINE,
    avatarUrl: DEFAULTAVATAR,
  },
];

function HomePage() {
  const [agentList, setAgentList] = useState(globalAgentList);

  function create(data: IAgent) {
    const id = crypto.randomUUID();
    const avatarUrl = DEFAULTAVATAR;
    const agent = { ...data, id, avatarUrl };
    setAgentList([...agentList, agent]);
  }

  function edit(data: IAgent) {
    const index = agentList.findIndex((agent) => agent.id === data.id);
    agentList[index] = { ...agentList[index], ...data };
    setAgentList([...agentList]);
  }

  function agentHandler(data: IAgent) {
    const isEdit = data.id !== undefined;
    if (isEdit) {
      edit(data);
    } else {
      create(data);
    }
  }
  return (
    <div className="flex-1 mt-10 mx-10">
      <div className="flex justify-end">
        <UserNav />
      </div>
      <div className="flex justify-end mt-10">
        <AgentForm
          buttonText={CREATEAGENT}
          isEdit={false}
          agent={{ name: "", status: undefined }}
          onAgentHandler={agentHandler}
        />
      </div>
      <div className="mt-2">
        <Table>
          <TableBody>
            {agentList.map((agent) => (
              <TableRow key={agent.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={agent.avatarUrl} />
                    <AvatarFallback>{agent.name}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{agent.name}</TableCell>
                <TableCell>{agent.status}</TableCell>
                <TableCell className="text-right">
                  <AgentForm
                    buttonText={EDIT}
                    isEdit={true}
                    agent={agent}
                    onAgentHandler={agentHandler}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default HomePage;
