import { confirm, checkbox } from '@inquirer/prompts'
import { exec } from 'child_process'
import ora from 'ora'

const BREW_CASKS = [
  { name: 'Brave Browser', value: 'brave-browser' },
  { name: 'Arc', value: 'arc' },
  { name: 'Signal', value: 'signal' },
  { name: 'Google Chrome', value: 'google-chrome' },
  { name: '1Password', value: '1password' },
  { name: 'NordVPN', value: 'nordvpn' },
  { name: 'Postman', value: 'postman' },
  { name: 'Google Drive', value: 'google-drive' },
  { name: 'Raycast', value: 'raycast' },
  { name: 'Rectangle', value: 'rectangle' },
  { name: 'Proxyman', value: 'proxyman' },
  { name: 'Orion', value: 'orion' },
  { name: 'Android Studio', value: 'android-studio' },
  { name: 'Postico', value: 'postico' },
  { name: 'Obsidian', value: 'obsidian' },
  { name: 'Visual Studio Code', value: 'visual-studio-code' },
  { name: 'Stretchly', value: 'stretchly' },
]

const runCommand = (programName: string, command: string, successMessage?: string) => {
  const spinner = ora(`Installing ${programName}...`).start()
  exec(command, (error, stdout, stderr) => {
    if (error) {
      spinner.fail(
        `Failed to install ${programName} with command: ${command}.${stdout ? `\n${stdout}` : ''}${stderr ? `\n${stderr}` : ''}`,
      )
    } else {
      spinner.succeed(
        `Successfully installed ${programName}${stdout ? `:\n${stdout}` : '.'}${successMessage ? `\n${successMessage}` : ''}`,
      )
    }
  })
}

exec('sudo -v', async (sudoError) => {
  if (sudoError) {
    console.error(sudoError)
    return
  }

  const shouldSetUpHomebrew = await confirm({ message: 'Set up Homebrew?' })
  if (shouldSetUpHomebrew) {
    runCommand(
      'Homebrew',
      '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
    )
  }

  const homebrewCasksToInstall = await checkbox({
    message: 'Select which Homebrew casks to install:',
    pageSize: BREW_CASKS.length,
    choices: BREW_CASKS,
  })

  let successMessage = ''
  if (homebrewCasksToInstall.includes('1password')) {
    successMessage +=
      '# 1PASSWORD: follow these steps afterwards for MacOS integration\n# https://support.1password.com/mac-universal-autofill'
  }
  if (homebrewCasksToInstall.includes('raycast')) {
    successMessage +=
      '# RAYCAST: go to docs to setup global hotkey and other info\n# https://manual.raycast.com/'
  }

  if (homebrewCasksToInstall.filter((cask) => cask !== 'stretchly').length > 0) {
    runCommand(
      'selected Homebrew casks',
      `brew install ${homebrewCasksToInstall.join(' ')}`,
      successMessage,
    )
  }

  const includesStretchly = homebrewCasksToInstall.includes('stretchly')
  if (includesStretchly) {
    runCommand('Stretchly', 'brew install --cask --no-quarantine stretchly')
  }
})
