class MyConsole {
    log(message) {
        process.stdout.write(message + "\n")
    }

    debug(message) {
        process.stdout.write(message + "\n")
    }

    info(message) {
        process.stdout.write(message + "\n")
    }

    warn(message) {
        process.stderr.write(message + "\n")
    }

    error(message) {
        process.stderr.write(message + "\n")
    }
}

module.exports.MyConsole = MyConsole;