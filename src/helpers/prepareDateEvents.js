import moment from "moment";

export const prepareDateEvents = ( events = [] ) => {

    return events.map(
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(),
            start: moment( e.start ).toDate()
        })
    )

}


