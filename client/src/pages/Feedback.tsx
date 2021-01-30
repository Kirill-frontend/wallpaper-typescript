import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import { feedbackSendAsync } from '../redux/actions'
import { RootState } from '../redux/reducers'

const Feedback: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const dispatch = useDispatch()

  const isLoading = useSelector((state: RootState) => state.loadingReduce.loading)
  
  const FeedbackHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    dispatch(feedbackSendAsync(value))
  }

  return (
    <>
      <Navbar activeElement='Profile' />
      <main className="container">
        <div className="titles mb2">
          <h1>Form feedback</h1>
        </div>
        {isLoading && <Loader />}
        <form className="row-flex-between" onSubmit={FeedbackHandler}>
          <div className="input-field w-80-p">
            <textarea
              onChange={event => setValue(event.target.value)}
              id="feeback_message"
              name="feebackmessage"
              className="materialize-textarea"
              disabled={isLoading}
            >
            </textarea>
            <label htmlFor="feeback_message">Your Message</label>
          </div>
          <div className="input-field">
            <button
              type='submit'
              className="waves-effect red accent-3 waves-light btn-large"
              disabled={isLoading}
            >
              Send
              </button>
          </div>
        </form>
      </main>
    </>
  )
}

export default Feedback