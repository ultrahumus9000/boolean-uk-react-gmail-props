import Email from './Email'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

const getSearchEmails = (emails, search) => {
  return emails.filter(email => {
    return ['sender', 'title'].some(key => {
      return email[key].toLowerCase().includes(search.toLowerCase())
    })
  })
}

function Emails(props) {
  let filteredEmails = props.emails

  if (props.hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (props.currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)

  if (props.currentTab === 'inbox')
    filteredEmails = getReadEmails(filteredEmails)

  if (props.search !== '')
    filteredEmails = getSearchEmails(filteredEmails, props.search)
  console.log('filtered after line 31', filteredEmails, props.search)

  return (
    <main className="emails">
      <ul>
        {filteredEmails.map((email, index) => {
          return (
            <Email
              email={email}
              key={index}
              toggleRead={props.toggleRead}
              toggleStar={props.toggleStar}
            />
          )
        })}
      </ul>
    </main>
  )
}
export default Emails
