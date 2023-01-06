import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "src/core/layouts/Layout"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import logout from "src/auth/mutations/logout"
import logo from "public/logo.png"
import { useMutation } from "@blitzjs/rpc"
import { Routes, BlitzPage } from "@blitzjs/next"
import { useState } from "react"

import Calendar from "react-calendar"
import Time from "./Time"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
  const [date, setDate] = useState<Object>(new Date())
  const [showTime, setShowTime] = useState(false)

  return (
    <div className="app">
      <h1 className="header">React Scheduling App</h1>
      <Suspense fallback="Loading...">
        <UserInfo />
      </Suspense>
      <div>
        <Calendar onChange={setDate} value={date} onClickDay={() => setShowTime(true)} />
      </div>

      {date.valueOf.length > 0 ? (
        <p>
          <span>Start: </span>
          {date[0].toDateString()}
          &nbsp; &nbsp;
          <span>End: </span>
          {date[1].toDateString()}
        </p>
      ) : (
        <p>
          <span>Default selected date:</span>
          {date.toString()}
        </p>
      )}
      <Time showTime={showTime} date={date} />
    </div>
  )
}

export default Home
