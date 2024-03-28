'use client'

import Image from 'next/image'
import { useState } from 'react'
import clsx from 'clsx'
import Squirrel from '@/public/squirrel-lol.png'

const initialJokes = [
  {
    id: generateRandomString(),
    content:
      'An electron walks into a bar and asks, how much for a beer. The bartender says, for you, free of charge.',
    highlight: 'free of charge.',
  },
  {
    id: generateRandomString(),
    content:
      'Wie viele Programmierer sind nötig, um eine kaputte Glühbirne auszuwechseln? - Keine. Das ist ein Hardwareproblem.',
    highlight: 'Hardwareproblem.',
  },
  {
    id: generateRandomString(),
    content: '— Ты кто по профессии? — Блогер. — Я тоже ничего не умею ...',
    highlight: 'ничего не умею ...',
  },
]

function generateRandomString() {
  return Math.random().toString(36).substring(2)
}

export default function Home() {
  const [jokes, setJokes] = useState(initialJokes)
  const [joke, setJoke] = useState({
    id: generateRandomString(),
    content: '',
    highlight: '',
  })

  function MakeMeBeautiful({ content, highlight }) {
    const emojis = ['😭', '😁', '😍', '😆']

    if (MakeMeBeautiful.current === undefined) MakeMeBeautiful.current = 0
    else MakeMeBeautiful.current = ++MakeMeBeautiful.current % 4

    const start = content.indexOf(highlight)
    const before = content.substring(0, start)
    const after = content.substring(start + highlight.length)

    return (
      <p
        key={generateRandomString()}
        className="relative rounded-md bg-slate-600 p-2"
      >
        {before}
        {highlight && (
          <span
            className={clsx('inline-block -rotate-2 rounded-sm p-2', {
              'bg-amber-500': MakeMeBeautiful.current === 0,
              'bg-sky-500': MakeMeBeautiful.current === 1,
              'bg-green-500': MakeMeBeautiful.current === 2,
              'bg-teal-500': MakeMeBeautiful.current === 3,
            })}
          >
            {highlight}
          </span>
        )}
        {after}
        <span className="absolute -right-2 -top-3">
          {emojis[MakeMeBeautiful.current]}
        </span>
      </p>
    )
  }

  function handleAddJoke(e) {
    e.preventDefault()
    setJokes([...jokes, joke])
    setJoke({ content: '', highlight: '' })
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-8 bg-gray-900 p-24">
      <h1 className="relative mb-10 text-3xl font-bold">
        The Notebook for{' '}
        <span className="inline-block -rotate-2 bg-gray-100 p-2 text-black">
          a chuckle
        </span>
        <span className="absolute -right-5 -top-5 rotate-12">🤣</span>
      </h1>
      <Image
        src={Squirrel}
        alt="squirrel laughing in front of laptop"
        className="rounded-md"
        width="400"
      />

      {jokes.map((individualJoke) => MakeMeBeautiful(individualJoke))}

      <form className="space-y-3" onSubmit={handleAddJoke}>
        <label htmlFor="joke" className="block">
          Enter your joke
        </label>
        <input
          id="joke"
          type="text"
          value={joke.content}
          onChange={(e) => setJoke({ content: e.target.value, highlight: '' })}
          className="rounded-md px-2 py-1 leading-8 text-black"
        />
        <button
          type="submit"
          className="ml-2 rounded-md bg-gray-200 px-6 py-2 font-medium text-black"
        >
          Add
        </button>
      </form>

      <div>
        <div>{joke.content ? 'Preview' : 'type something ...'}</div>
        <div
          className="relative rounded-md bg-slate-600 p-2"
          onMouseUp={() =>
            setJoke({
              ...joke,
              highlight: window.getSelection().toString(),
            })
          }
        >
          {joke.content && (
            <span className="rounded-sm selection:bg-red-500">
              {MakeMeBeautiful(joke)}
            </span>
          )}
        </div>
      </div>
    </main>
  )
}
