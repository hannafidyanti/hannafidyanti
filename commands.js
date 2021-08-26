// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Cache = {}

Cypress.goto = (param) => cy.visit(
    Cypress.env('host') + param
)

Cypress.send = (param) => cy.request(
    Cypress.env('api') + param
)

Cypress.post = (param, data) => cy.request({
    method: 'POST',
    url: Cypress.env('host') + param,
    body: data,
})

Cypress.send_with_auth = (param) => cy.request({
    method: 'GET',
    url: Cypress.env('api') + param,
    headers: {
        'Authorization': 'Bearer ' + Cypress.Cache['token'],
    },
})

Cypress.Commands.add("fill_inputs", (inputs, attribute) => {
    for (let k in inputs) {
        cy.get(`input[${attribute || 'formcontrolname'}=${k}]`)
            .type(inputs[k])
    }
})

Cypress.Commands.add("fill_inputs_name", (inputs, attribute) => {
    for (let k in inputs) {
        cy.get(`input-text[${attribute || 'name'}=${k}]`)
            .type(inputs[k])
    }
})

Cypress.Commands.add("fill_inputs_number", (inputs, attribute) => {
    for (let k in inputs) {
        cy.get(`input-text-number[${attribute || 'name'}=${k}]`)
            .type(inputs[k])
    }
})

Cypress.Commands.add("fill_texts", (inputs, attribute) => {
    for (let k in inputs) {
        cy.get(`textarea[${attribute || 'formcontrolname'}=${k}]`)
            .type(inputs[k])
    }
})

Cypress.Commands.add("fill_selects", (selects, attribute) => {
    for (let k in selects) {
        cy.get(`select[${attribute || 'formcontrolname'}=${k}]`)
            .select(selects[k], {force: true})
    }
})

Cypress.Commands.add("fill_radios", (checks, attribute) => {
    for (let k in checks) {
        cy.get(`input[${attribute || 'formcontrolname'}=${k}]`)
            .check(checks[k], {force: true})
    }
})

// P2P - PEMINJAM INDIVIDU
Cypress.Commands.add('web_p2p_register_bi', (time, password) => {    
    time = Cypress.moment().format('Dss')
    password = password || Cypress.config('default_password')

    cy.request({
        method: 'POST',
        url: Cypress.config('host') + '/api/register/peminjam',

        body: {
            user_type: 'BI',
            no_ktp: (Math.random() + '').substring(2,10) + (Math.random() + '').substring(2,10),
            no_npwp: (Math.random() + '').substring(2,9) + (Math.random() + '').substring(2,9) + '0',
            nama: 'Peminjam ' + time,
            email: 'bafafe1513@gocasin.com',
            password: 'testing@123',
            tanggal_lahir: '1996-03-29T00:00:00+07:00',
            jenis_kelamin: '2',
            status_pernikahan: '05',
            nomor_hp: (Math.random() + '').substring(2,8) + (Math.random() + '').substring(2,8),
        },
    }).then((res) => {
        cy.log(res)
    })
})

// P2P - PEMINJAM USAHA
Cypress.Commands.add('web_p2p_register_bu', (time, password) => {
    cy.visit(Cypress.config('host') + '/users/register-peminjam')

    time = Cypress.moment().format('Dss')
    password = password || Cypress.config('default_password')

    cy.fill_radios({
        user_type: 'BU',
    })

    cy.fill_inputs({
        no_akta: (Math.random() + '').substring(2,8) + (Math.random() + '').substring(2,8),
        no_npwp: (Math.random() + '').substring(2,9) + (Math.random() + '').substring(2,9) + '0',
        nama: 'Peminjam Corp ' + time,
        kontak_person: 'Madeline' + time,
        jabatan_kontak_person: 'Manager',
        email: 'bikelek588@nnacell.com',
        password: 'testing@123',
        nomor_hp1: (Math.random() + '').substring(2,8) + (Math.random() + '').substring(2,8),
    })

    cy.get('form')
        .find('button')
        .click()

    cy.get('.modal-content')
        .find('.btn.btn-primary')
        .click()

    cy.get('.modal-content')
        .find('.btn.btn-primary')
        .click()
})

// P2P - PENDANA INDIVIDU
Cypress.Commands.add('web_p2p_register_li', (time, password) => {    
    time = Cypress.moment().format('Dss')
    password = password || Cypress.config('default_password')

    cy.request({
        method: 'POST',
        url: Cypress.config('host') + '/api/register/pendana',

        body: {
            user_type: 'LI',
            no_ktp: (Math.random() + '').substring(2,10) + (Math.random() + '').substring(2,10),
            nama: 'Pendana ' + time,
            email: 'yohapa2694@dmsdmg.com',
            password: 'testing@123',
            tanggal_lahir: '1996-03-29T00:00:00+07:00',
            jenis_kelamin: '2',
            status_pernikahan: '05',
            nomor_hp: (Math.random() + '').substring(2,8) + (Math.random() + '').substring(2,8),
        },
    }).then((res) => {
        cy.log(res)
    })
})

Cypress.Commands.add('web_p2p_register_li_validate', (token, value) => {
    cy.request({
        method: 'POST',
        url: Cypress.config('host') + '/api/login',

        body: {
            email: 'fikipa8703@d4wan.com',
            password: 'testing@123',
        },
    }).then((res1) => {
        cy.log(res1)

        token = res1.body.data.token

        cy.request({
            method: 'GET',
            url: Cypress.config('host') + '/api/peminjam/edit',
            headers: { Authorization: 'Bearer ' + token },

            body: {},
        }).then((res2) => {
            cy.log(res2)

            value = Cypress.config(res2.body.data.cust_detail)

            cy.request('POST', {url: 'http://testing.xyz/api/peminjam/edit'}, {Authorization: 'Bearer ' + token },{ nama: value.nama  }).then(
                (response) => {
                    // response.body is automatically serialized into JSON
                    expect(response.body).to.have.property('nama', 'Gina') // true
                }
            )
        })
    })
})

// P2P - PENDANA USAHA
Cypress.Commands.add('web_p2p_register_lu', (time, number) => {
    cy.visit(Cypress.config('host') + '/users/login')

    cy.contains('Daftar Sekarang').click()
    cy.contains('Mendaftar Sebagai Pendana').click()

    time = Cypress.moment().format('Dss')
    number = (Math.random() + '').substring(2,8) + (Math.random() + '').substring(2,8)

    cy.get('[type="radio"]').check('LU')

    cy.fill_inputs({
        no_akta: time + '1',
        no_npwp: number + '000',
        nama: 'Pendana ' + time,
        kontak_person: 'Marrie ' + time,
        jabatan_kontak_person: 'Manager',
        email: 'kaxac96864@nnacell.com',
        password: 'testing@123',
        nomor_hp1: number,
    })

    cy.get('form').find('button')
        .click()

    cy.get('.modal-content')
        .find('.btn.btn-primary')
        .click()

    cy.get('.modal-content')
        .find('.btn.btn-primary')
        .click()

    cy.wait(1000)
})

// P2P - PEMINJAM - PENDANA
Cypress.Commands.add("web_p2p_login", (email, password) => {
    cy.visit(Cypress.config('host') + '/users/masuk')

    cy.get('form')
        .find('input')
        .first()
        .type(email)
        .should('have.value', email)
    
    password = password || Cypress.config('default_password')
    cy.get('form')
        .find('input[type=password]')
        .first()
        .type(password)
        .should('have.value', password)

    cy.get('form').find('button')
        .click()

    cy.wait(1000)
    cy.contains('Beranda').should('be.visible') 
})

// P2P - PEMINJAM
Cypress.Commands.add('web_p2p_pengajuan', (amount, cost, time) => {
    amount = amount || Cypress.moment().format('MDss') + '00'
    cost = cost || Cypress.moment().format('HHmm') + '000'
    time = Cypress.moment().format('DDss')

    cy.request({
        method: 'POST',
        url: Cypress.config('host') + '/api/login',

        body: {
            email: 'xxemailpeminjam@gmail.comxx',
            password: 'testing@123',
        },
    }).then((res1) => {
        cy.log(res1)

        cy.request({
            method: 'POST',
            url: Cypress.config('host') + '/api/peminjam/projectsubmit',
            
            headers: { Authorization: 'Bearer ' + res1.body.data.token },
            body: {
                project_tujuan: '2',
                project_name: 'Project Financing - Pengadaan Container - ' + time,
                metode_pembayaran: '4',
                jumlah_pengajuan: amount,
                jumlah_hari: '2',
                pendapatan_tahun_lalu: cost,
                biayahpp_tahun_lalu: cost,
                biayaops_tahun_lalu: cost,
                aset_sekarang: cost,
                hutang_sekarang: cost,
                jaminan: '0',
                loan_afiliasi: [{
                    bidang_usaha: 'F&B',
                    due_date: Cypress.moment().format(),
                    nama_klien: 'PT MAMI',
                    nominal: time + '000',
                    nomor_inv: time, 
                }],
                cek_pihak_ketiga: true, 
            }
        }).then((res2) => {
            cy.log(res2)
        })
    })
})