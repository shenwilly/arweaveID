function fetch_identity (address) {
    (async () => {
        $("#form-identity").hide()
        $(".loading-indicator").show()

        let query =
            {
                // op: 'and',
                // expr1:
                //     {
                op: 'and',
                expr1:
                    {
                        op: 'equals',
                        expr1: 'App-Name',
                        expr2: 'arweave-id'
                    },
                expr2: 
                    {
                        op: 'equals',
                        expr1: 'App-Version',
                        expr2: versionNumber,
                    }
                    // },
                // expr2:
                //     {
                //         op: 'equals',
                //         expr1: 'owner',
                //         expr2: address,
                //     },
            }

        console.log('fetching identity...')
        const res = await this.arweave.api.post(`arql`, query)
        console.log('fetching identity success!')
        var tx_rows = []
        if (res.data != '') {
            tx_rows = await Promise.all(res.data.map(async function (id, i) {
                let tx_row = {}
                let tx = await this.arweave.transactions.get(id)
                let tx_owner = await arweave.wallets.ownerToAddress(tx.owner)

                if (tx_owner != address) return;

                tx_row['unixTime'] = '0'
                tx_row['type'] = null;
                tx.get('tags').forEach(tag => {
                    let key = tag.get('name', { decode: true, string: true })
                    let value = tag.get('value', { decode: true, string: true })
                    if (key === 'Unix-Time') tx_row['unixTime'] = value
                    if (key === 'Type') tx_row['type'] = value
                })

                let data = tx.get('data', {decode: true, string: true})

                tx_row['id'] = id
                tx_row['value'] = data

                return tx_row
            }))
        }

        console.log(tx_rows);

        $(".loading-indicator").hide();

        // sort ascending to get latest identity
        tx_rows.sort((a, b) => (Number(a.unixTime) - Number(b.unixTime)))
        tx_rows.forEach(function (item) {
            // last modifed datetime
            // var datetime = new Date(item["unixTime"]*1000);
            // var date_options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            // var formatted_datetime = datetime.toLocaleDateString('default', date_options)

            $("#form-identity input[data='" + item['type'] + "']").val(item['value'])
        })

        $("#form-identity").show()
    })()
}
