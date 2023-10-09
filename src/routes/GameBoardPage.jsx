import { useContext } from 'react'
import { Board } from '../components/Board'
import { Keyboard } from '../components/Keyboard'
import { UserAnswersContext } from '../context/userAnswersContext'
import { UserGameData } from '../context/userGameDataContext'
import { GameData } from '../context/gameDataContext'
import { AnimatePresence } from 'framer-motion'
import { GameMoldal } from '../components/modal-end-game/EndGameModal'
import { WarnModal } from '../components/complete-words-modal/WarnModal'
import { useUpdateStates } from '../hook/useUpdateGloblaStates'

export function GameBoard () {
  const { answers } = useContext(UserAnswersContext)
  const { gameInfo: { endGameModal, isUserWinner, warnModal } } = useContext(GameData)
  const { userData: { currentAttempt, streak } } = useContext(UserGameData)
  const { clearWordsPlayed, resetAttempt } = useUpdateStates()

  const miniBoard = answers.slice(0, currentAttempt)
  return (
    <>
      <main className="flex justify-center dark:text-white font-Poppins">
        <section className="flex flex-col gap-2 w-[310px] px-4 sm:w-[350px] sm:p-0">
            <span className="font-bold text-lg italic">Racha : {streak}</span>
          <Board />
          <Keyboard />
        </section>

        <AnimatePresence>
          {endGameModal && (
            <GameMoldal
              resetAttempt={resetAttempt}
              isWinner={isUserWinner}
              board={miniBoard}
            />
          )}
          {warnModal && <WarnModal clear={clearWordsPlayed} />}
        </AnimatePresence>

      </main>
    </>
  )
}
