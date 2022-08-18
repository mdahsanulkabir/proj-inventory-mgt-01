let bom = [
    {
        partId : "df",
        boms : [
                {
                    rm_1 : {
                        rmId : "rm1_id",
                        rmQty : 2
                    },
                    rm_2 : {
                        rmId : "rm2_id",
                        rmQty : 0.0015
                    },
                    rm_3 : {
                        rmId : "rm3_id",
                        rmQty : 0.005
                    },
                    dateOfUpdate : "23"
                }
            ],
        activeBom : {}
    }
]

bom[0].activeBom = bom.boms[0]
console.log(bom);