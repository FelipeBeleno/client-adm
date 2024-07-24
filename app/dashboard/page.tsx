"use client"
import Cards from "@/components/Cards";
import { useSession } from "next-auth/react"

export default function DashboardPage() {

  const { data: session, status } = useSession();

  return (
    <div className="col-span-12">
      <Cards />
    </div>
  )
}
