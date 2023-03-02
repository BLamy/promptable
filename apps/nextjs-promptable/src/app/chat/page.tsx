
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Chat from "../../components/Chat";
import { redirect } from 'next/navigation';
import ClientRedirect from './ClientRedirect';

export default function ChatPage({ searchParams }) {
  if (searchParams?.foo !== "bar") {
    return <ClientRedirect searchParams={searchParams} />
  }
  return <Chat />;
};
