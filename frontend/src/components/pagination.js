import usersListPageTpl from '../views/users-pages.art'
import page from '../databus/page'

const pageSize = page.pageSize

const bindEvents = (data) => {
    $('#users-page').off('click').on('click', '#users-page-list li:not(:first-child,:last-child)', function () {
        const index = $(this).index()
        page.setCurrentPage(index)
        $('body').trigger('changeCurrentPage', index)
        setPageActive(index)
    })

    $('#users-page').on('click', '#users-page-list li:first-child', function () {
        if (page.currentPage > 1) {
            page.setCurrentPage(page.currentPage - 1)
            $('body').trigger('changeCurrentPage', page.currentPage)
            setPageActive(page.currentPage)
        }
    })

    $('#users-page').on('click', '#users-page-list li:last-child', function () {
        if (page.currentPage < Math.ceil(data.length / pageSize)) {
            page.setCurrentPage(page.currentPage + 1)
            $('body').trigger('changeCurrentPage', page.currentPage)
            setPageActive(page.currentPage)
        }
    })
}

const setPageActive = (index) => {
    $('#users-page #users-page-list li:not(:first-child,:last-child)')
        .eq(index - 1)
        .addClass('active')
        .siblings()
        .removeClass('active')
}

const handlePagination = (data) => {
    const total = data.length
    const pageCount = Math.ceil(total / pageSize)
    const pageArray = new Array(pageCount)
    const htmlPage = usersListPageTpl({
        pageArray
    })
    $('#users-page').html(htmlPage)
    setPageActive(page.currentPage)
    bindEvents(data)
}

export default handlePagination