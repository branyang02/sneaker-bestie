const { spawn } = require('child_process');
const { Buffer } = require('buffer');

function callPythonScript(input) {
    const base64input = Buffer.from(JSON.stringify(input)).toString('base64');
    // const python = spawn('python', ['./api/utils/py_scripts/recommend_news.py', base64input]);
    const python = spawn('python', ['py_scripts/recommend_news.py', base64input]);

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
callPythonScript({
    userName: "Brandon",
    categories: ["sports", "politics", "entertainment", "business", "technology", "science"],
});
