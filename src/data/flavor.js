/** Personality: fortunes, jokes, and the things a real shell has that a portfolio doesn't. */

export const fortunes = [
  'Caching is just remembering things badly, on purpose, very fast.',
  'The bug was never in the code you were reading.',
  'Every "temporary" workaround outlives the system it was working around.',
  'A provider API is a promise made by someone who has already left the company.',
  'Naming things is hard. Renaming things across four services is harder.',
  'Nothing focuses the mind like a live match and a wrong scoreline.',
  'You do not have a caching problem. You have an invalidation problem.',
  '"It works on my machine" is a statement about your machine.',
  'The agent stopped at 80% and told you it was finished. It always does.',
  'Estimates are just hopes wearing a suit.',
  'Any sufficiently advanced configuration file is indistinguishable from a programming language.',
  'The scoreboard is never wrong. The feed is frequently wrong.',
  'Write the test that would have caught it, not the test that proves it is fixed.',
  'Ship it Friday and you will learn what your alerting actually covers.',
  'The best error message is the one that tells you which of your assumptions was wrong.',
  'Documentation is a love letter you write to your future self at 3am.',
  'There are two hard problems in sports data: timezones, and everything else.',
]

export const motd = [
  'Currently: backend and platform work at All Things Rugby, Doha.',
  'Shipping mobile games under hkinggames on the side.',
  'Open to interesting problems — try `contact`.',
]

/** The classic punishment for mistyping `ls`. */
export const train = String.raw`
      ====        ________                ___________
  _D _|  |_______/        \__I_I_____===__|_________|
   |(_)---  |   H\________/ |   |        =|___ ___|
   /     |  |   H  |  |     |   |         ||_| |_||
  |      |  |   H  |__--------------------| [___] |
  | ________|___H__/__|_____/[][]~\_______|       |
  |/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\  /~~\  /~~\  /~~\ ____Y___________|__
 |/-=|___|=O=====O=====O=====O   |_____/~\___/
  \_/      \__/  \__/  \__/  \__/      \_/
`

export const teapot = String.raw`
       (  )   (   )  )
        ) (   )  (  (
        ( )  (    ) )
        _____________
       <_____________> ___
       |             |/ _ \
       |               | | |
       |               |_| |
    ___|             |\___/
   /    \___________/    \
   \_____________________/
`

export const manPages = {
  ps: 'ps — report a snapshot of the current projects.\n\nProjects are processes. STAT is honest: R is running, S is shipped and stable, T is paused, Z is abandoned and kept public deliberately. %CPU is roughly what share of my attention a thing holds; UPTIME is time since I started it, not time spent on it. Every column sorts.',
  open: 'open — open a project.\n\nTakes a project name or slug. Fuzzy: `open orbit` finds orbitdesk. Run `ps` for the list.',
  stack: 'stack — read the long version.\n\nWithout arguments, lists available writeups. With a topic, renders it. These are the things I would actually talk about in an interview, written down so I do not have to.',
  arch: 'arch — draw the All Things Rugby data path.\n\nA whiteboard diagram of how a scoreline gets from a provider to a phone, and where the checks sit relative to the cache. The placement is the whole point.',
  arcade: 'arcade — play something.\n\nLinks to the shipped mobile games, plus the rock shooter that has been on this site since 2023 for no defensible reason.',
  theme: 'theme — change the palette.\n\nmatrix (default), amber, ice, or paper. Paper is a light high-contrast theme for people who would rather not read green on black. Your choice is remembered.',
  kill: 'kill — send a signal to a process.\n\nIt will not work. Nothing here is killable. Some processes have opinions about being asked.',
  fortune: 'fortune — print a randomly selected adage.\n\nOpinions formed the expensive way.',
  whoami: 'whoami — print the current user.\n\nThe short version of five years.',
  help: 'help — list every command.\n\nYou are presumably already familiar with this one.',
  man: 'man — display the manual for a command.\n\nRecursion is left as an exercise for the reader.',
  sl: 'sl — steam locomotive.\n\nCorrects you for mistyping `ls`. This is a real package that real people really install.',
}
