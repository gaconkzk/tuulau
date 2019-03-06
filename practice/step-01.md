# 1 - Streaming a file.
---
Write a script that reads its own source code and streams it to stdout.

## Tips
---
For this task we'll need to use the stream API.

Check out the fs.createReadStream to create readable streams from files.

To pipe two or more streams together with error handling included, check out the pump module.

If you are looking for a file to stream out, you can use the source code itself using the __filename filename.

## Testing
---
To test your program, simply run it with node and verify that it outputs its own source code.

```
node reader.js
```
