/**
 * This report.ts file is a data model for creating report reactive form.
 */

export class Report {
    reporttype: string;
    account: string;
    timerange: string;
    email: string;
    // repeat: string;
    // start: string;
    // callbackurl: string;
}

export const ReportTypes = ['Transaction history',
                     'orders',
                     'mispayments',
                     'subscriptions',
                     'transfers',
                     'taxes',
                     'tax_transactions',
                     'referrals',
                     'exchange',
                    ];

export const Accounts = ['BTC',
                        'ETH',
                        'EOS',
                        'VKC',
                        ];

export const Timeranges = ['today',
                          'yesterday',
                          'past_7',
                          'selected',
                          'month_to_date',
                          'last_full_month',
                          'year_to_date',
                          'last_full_year',
                          'all',
                          'custom',
                          ];

// TODO: Add more option array below.
