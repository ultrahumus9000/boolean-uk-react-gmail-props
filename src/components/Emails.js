import Email from './Email'

function Emails(props) {
  return (
    <main className="emails">
      <ul>
        {props.filteredEmails.map((email, index) => {
          console.log(email)
          console.log(index)
          return (
            <Email
              email={email}
              index={index}
              toggleRead={props.toggleRead}
              toggleStar={props.toggleStar}
              filteredEmails={props.filteredEmails}
            />
          )
        })}
      </ul>
    </main>
  )
}
export default Emails
