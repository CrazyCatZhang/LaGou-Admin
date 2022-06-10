import positionsAddTpl from '../../views/positions-add.art'

const addPositions = ()=>{
    $('#positions-list-box').after(positionsAddTpl({}))
    $('#positions-save').off('click').on('click', ()=>{
        const formBody = $('#position-form').serialize()
        console.log(formBody)
        $('#positions-close').click()
    })
}

export default addPositions
