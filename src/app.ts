import confirm from '@inquirer/confirm'
// import checkbox from '@inquirer/checkbox'
import { exec } from 'child_process'
import ora from 'ora'

const answer = await confirm({ message: 'Set up Homebrew?' })
if (answer) {
  exec('sudo -v', (sudoError) => {
    if (sudoError) {
      console.error(sudoError)
      return
    }

    const spinner = ora('Installing homebrew...').start()
    exec(
      '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      // 'echo hello world',
      (error, stdout, stderr) => {
        if (error) {
          spinner.fail(`Failed to install homebrew: ${stderr}`)
        } else {
          spinner.succeed(`Successfully installed homebrew: ${stdout}`)
        }
      },
    )
  })
}
