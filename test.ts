import { Evt } from "evt";
//import * as runExclusive from "run-exclusive";
import { id } from "tsafe/id";

const createEvtNumber = () => {
    const evtNumber = Evt.create<number>();

    (async () => {
        await evtNumber.postAsyncOnceHandled(1);

        [2, 3, 4, 5, 6, 7].map(i => evtNumber.post(i));
    })();

    return evtNumber;
};

const evtNumber = createEvtNumber();

/*
const evtX = Evt.asyncPipe(
	evtNumber,
	runExclusive.build(async (number: number) => {

		if (number <= 2) {
			return null;
		}

		await new Promise(resolve => setTimeout(resolve, 1000));

		return id<[number]>([number * number]);

	}));
	*/

const evtX = Evt.asyncPipe(evtNumber, async (number: number) => {
    if (number <= 2) {
        return null;
    }

    await new Promise(resolve =>
        setTimeout(resolve, evtNumber.postCount * 1000),
    );

    return id<[number]>([number * number]);
});

const ctx = Evt.newCtx();

evtX.attach(ctx, number => {
    console.log(number);

    //ctx.done();
});
