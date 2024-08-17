/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function wait1(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Function one compleates after ${t} seconds`);
    }, t * 1000);
  });
}

function wait2(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Function two compleates after ${t} seconds`);
    }, t * 2000);
  });
}

function wait3(t) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Function three compleates after ${t} seconds`);
    }, t * 3000);
  });
}

function calculateTime(t1, t2, t3) {
  const start = Date.now();

  return Promise.all([wait1(t1), wait2(t2), wait3(t3)]).then((result) => {
    const end = Date.now();
    const totalTime = end - start;

    return {
      result: result,
      timeTaken: totalTime,
    };
  });
}

module.exports = calculateTime;
