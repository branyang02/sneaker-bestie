const { spawn } = require('child_process');

function callPythonScript(input) {
    // const python = spawn('python', ['./api/utils/py_scripts/example.py', input]);
    const python = spawn('python', ['py_scripts/example.py', input]);

    python.stdout.on('data', (data) => {
        console.log(`Python script output: ${data}`);
    });

    python.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

// Use this function wherever you want to run your Python script
// For example, let's assume that we want to find recommendations for the movie "Interstellar"
callPythonScript("test");
