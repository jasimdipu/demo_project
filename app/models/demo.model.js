module.exports = mongoose => {
    const Demo = mongoose.model(
        "demo", mongoose.Schema(
            {
                name: String,
                Dept: String,
                Address: String,
                isActive: Boolean
            },
            {
                timestamps: true
            }
        )
    );

    // let schema = mongoose.Schema(
    //     {
    //         fullname: String,
    //         dept: String,
    //         address: String,
    //         isActive: Boolean
    //     },
    //     {
    //         timestamps: true
    //     },
    // );
    //
    // schema.method("toJSON", function (){
    //     const {__v, _id, ...object} = this.toObject();
    //     object.id = _id;
    //     return object;
    // });
    // const Demo = mongoose.model("demo", schema);
    return Demo;
};