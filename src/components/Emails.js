import Email from './Email'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

function Emails(props) {
  let filteredEmails = props.emails
  console.log('filtered after line 12', filteredEmails)

  if (props.hideRead) filteredEmails = getReadEmails(filteredEmails)
  console.log('filtered after line 15', filteredEmails)

  if (props.currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)
  console.log('filtered after line 19', filteredEmails)

  if (props.currentTab === 'inbox')
    filteredEmails = getReadEmails(filteredEmails)
  console.log('filtered after line 23', filteredEmails)

  if (props.search !== '')
    filteredEmails = filteredEmails.filter(email => {
      return ['sender', 'title'].some(key => {
        return email[key].toLowerCase().includes(props.search.toLowerCase())
      })
    })
  console.log('filtered after line 31', filteredEmails)

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
