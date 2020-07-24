window.addEventListener('load', (event) => {
    console.log('test')
    document.getElementById('sendreq').onclick = submitWorkflowFromTemplate
})

const submitWorkflowFromTemplate = () => {
    fetch('/api/v1/workflow-templates/default/nac-stereo-wftmpl').then(function (response) {
        return response.json();
    }).then(function (data) {
        const frm = document.createElement('form')
        document.body.appendChild(frm)
        for (let param of data.spec.arguments.parameters){
            const inp = document.createElement('input', )
            const lbl = document.createElement('label')
            lbl.innerText = param.name
            frm.appendChild(lbl)
            frm.appendChild(inp)
            frm.appendChild(document.createElement('p'))
            // create injector into data structure
            inp.onchange = (evt) => {
                param.value = evt.target.value
            }
        }
        const submit = document.createElement('button')
        submit.innerText = 'submit workflow with parameters'
        // change the parameters
        submit.onclick = () => {submitMosaicWorkflow(data)}
        document.body.appendChild(submit)

    });
}

const submitMosaicWorkflow = (template) => {
    workflowSpec = {
        "metadata":{
            "generateName": template.metadata.generateName,
            "namespace": template.metadata.namespace
        },
        "spec": template.spec
    }
    workflowString = JSON.stringify({"workflow": workflowSpec})
    fetch("http://acdesk.jpl.nasa.gov/api/v1/workflows/default", {
        "headers": {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            "pragma": "no-cache"
        },
        "referrer": "http://acdesk.jpl.nasa.gov/workflows?new=%7B%7D",
        "referrerPolicy": "no-referrer-when-downgrade",
        "body": workflowString,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    })
        .then(response => response.json())
        .then(data => console.log(data))
}

const start_wf = () => {
    fetch('/api/v1/workflows/')
        .then(response => response.json())
        .then(data => console.log(data))
}
document.getElementById('sendreq').click = submitWorkflowFromTemplate