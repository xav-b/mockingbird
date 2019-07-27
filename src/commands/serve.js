const app = require('../server')

function register(prog, log) {
  prog
    .command('serve', 'start mocking server')
    .argument('<project>', 'Project scenarios definition', prog.STRING)
    .option('--port <port>', 'Server port', prog.INT, process.env.PORT || 3000)
    .action((args, opts) => {
      app
        .build(args.project)
        .listen(opts.port, () => log.watch(`Server is listening on port ${opts.port}`))
    })
}

module.exports = { register }
