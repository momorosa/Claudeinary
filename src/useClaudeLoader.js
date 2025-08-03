import { useEffect, useState } from 'react'

const loadingMessages = [
    "Chef Claude is slicing some logic onions...",
    "Tossing your ingredients into the algorithmic oven...",
    "Double-checking your pantry’s vibes...",
    "Whisking together the data sauce...",
    "Sprinkling a dash of AI seasoning..."
]

export default function useClaudeLoader(isLoading) {

    const [messageIndex, setMessageIndex ] = useState(0)

    useEffect(() => {
        let interval

        if(isLoading) {
            interval = setInterval(() => {
                setMessageIndex(prev => (prev + 1) % loadingMessages.length)
            }, 2000)
        } else {
            clearInterval(interval)
            setMessageIndex(0)
        }
        return () => clearInterval(interval)
    }, [isLoading])

    return loadingMessages[messageIndex]

}