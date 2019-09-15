const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default (emails: string) => {
  const invalidEmails = emails
    .split(',')
    .map((email: string) => email.trim())
    .filter((email: string) => re.test(email) === false)

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`
  }
}
