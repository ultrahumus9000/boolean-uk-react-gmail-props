import { useState } from 'react'

import initialEmails from './data/emails'

import './App.css'

import SearchBar from './components/Search'
import NavBar from './components/Nav'
import Emails from './components/Emails'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [search, setSearch] = useState('')

  console.log('hideRead', hideRead)

  console.log('currentTab', currentTab)

  console.log('search', search)

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = []

  function renderEmails() {
    filteredEmails = emails

    if (hideRead) filteredEmails = getReadEmails(filteredEmails)

    if (currentTab === 'starred')
      filteredEmails = getStarredEmails(filteredEmails)

    if (currentTab === 'inbox') filteredEmails = getReadEmails(filteredEmails)

    if (search !== '')
      filteredEmails = filteredEmails.filter(email => {
        return ['sender', 'title'].some(key => {
          return email[key].toLowerCase().includes(search.toLowerCase())
        })
      })
  }

  renderEmails()

  return (
    <div className="app">
      <SearchBar search={search} setSearch={setSearch} />
      <NavBar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        unreadEmails={unreadEmails}
        starredEmails={starredEmails}
        hideRead={hideRead}
        setHideRead={setHideRead}
      />
      <Emails
        filteredEmails={filteredEmails}
        toggleRead={toggleRead}
        toggleStar={toggleStar}
      />
    </div>
  )
}

export default App
