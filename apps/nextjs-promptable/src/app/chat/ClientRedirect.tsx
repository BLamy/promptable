"use client"

import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Chat from "../../components/Chat";
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'

export default function ClientRedirect({ searchParams }) {

    const router = useRouter()
    router.push("/chat?foo=bar")
    return <div></div>
//   if (searchParams?.foo !== "bar") {
    // redirect("/chat?foo=bar")
//   }
//   return <Chat />;
};
