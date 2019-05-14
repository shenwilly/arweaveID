function save_identity_field (type, value) {
    (async () => {
        $(".btn-save").addClass("disabled").addClass("wait");

        var unixTime = Math.round((new Date()).getTime() / 1000)

        var tx =
			await arweave.createTransaction(
			    {
			        data: value,
			    },
			    wallet
			)

        tx.addTag('App-Name', 'arweave-id')
        tx.addTag('App-Version', versionNumber)
        tx.addTag('Unix-Time', unixTime)
        tx.addTag('Type', type)
        await arweave.transactions.sign(tx, wallet)
        console.log(tx.id)
        await arweave.transactions.post(tx)
        alert('Your Arweave profile will be updated soon!')
        
        $(".btn-save").removeClass("disabled").removeClass("wait");
    })()
}
