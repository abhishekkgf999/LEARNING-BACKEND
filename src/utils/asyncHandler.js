/*
🚨 The Main Problem

When you write async code in Express (like DB queries), 
errors inside async/await don’t automatically go to Express’s error handler.

------------------------------------------------------------------------------------------------

🎯 Purpose of asyncHandler

To remove the need of writing try/catch manually in every route.

It automatically catches errors from async functions and passes 
them to Express's error handler (next(err)).

------------------------------------------------------------------------------------------------

🧠 Why it's important?

✔ Prevents app from crashing due to unhandled async errors
✔ Makes code cleaner and more readable
✔ Centralizes error handling
✔ Reduces repetition of try/catch blocks

------------------------------------------------------------------------------------------------

📝 In one sentence:

asyncHandler is a wrapper that catches errors in async route functions and 
passes them to Express error-handling middleware automatically.
*/

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// const asyncHandler = () => {}
// const asyncHandler = (func) => return (fn)=>{}
// const asyncHandler = (func) => return async ()=>{}

// const asyncHandler = (fn) => return async(req, res, next) => {
//     try{
//         await fn(req, res, next)
//     }catch(error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }
