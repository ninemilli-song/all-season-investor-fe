export const promiseMiddleware = store => (call, next) => {
    const { type } = call;
    const startDate = new Date();
    const startTime = startDate.getTime();
    console.log(`Action ${call.name} start at ${startDate.toTimeString()}`);

    // if (type === 'flow_spawn') {
    //     store.loading = true;
    // }
    next(call, () => {
        const endDate = new Date();
        const endTime = endDate.getTime();
        console.log(`Action start at ${endDate.toTimeString()}`);

        // if (type === 'flow_return') {
        //     store.loading = false;
        // }
        console.log(`Action ${call.name} end at ${endDate.toTimeString()}`);
        console.log(`Action ${call.name} consume time is ${endTime - startTime} milliseconds`);
    });
};

export default {
    promiseMiddleware
};
