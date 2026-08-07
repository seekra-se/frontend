/*
Copyright 2026 Seekra

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { getSetting, getSettingRecursively } from '../getSetting.js';
import { describe, test, expect } from 'vitest';

describe('getSetting', () => {
    test.for([
        ({ settings: [], name: '', expected: undefined }),
        ({ settings: [], name: 'a', expected: undefined }),
        ({ settings: [
            {
                type: 'bool',
                name: 'a',
                i18n: 'a'
            }
        ], name: 'a', expected: {
            type: 'bool',
            name: 'a',
            i18n: 'a'
        } })
    ])('returns $expected', ({ settings, name, expected }) => {
        expect(getSetting(name, settings)).toStrictEqual(expected);
    });

    const veryNestedSettingsList = [
        {
            type: 'bool',
            name: '1a',
            i18n: '1a'
        },
        {
            type: 'section',
            name: '1b',
            i18n: '1b',
            content: [
                {
                    type: 'bool',
                    name: '2a',
                    i18n: '2a'
                },
                {
                    type: 'section',
                    name: '2b',
                    i18n: '2b',
                    content: [
                        {
                            type: 'bool',
                            name: '3a',
                            i18n: '3a'
                        },
                        {
                            type: 'section',
                            name: '3b',
                            i18n: '3b',
                            content: [
                                {
                                    type: 'bool',
                                    name: '4a',
                                    i18n: '4a'
                                },
                                {
                                    type: 'section',
                                    name: '4b',
                                    i18n: '4b',
                                    content: [
                                        {
                                            type: 'bool',
                                            name: '5a',
                                            i18n: '5a'
                                        },
                                        {
                                            type: 'section',
                                            name: '5b',
                                            i18n: '5b',
                                            content: [
                                                {
                                                    type: 'bool',
                                                    name: '6a',
                                                    i18n: '6a'
                                                },
                                                {
                                                    type: 'section',
                                                    name: '6b',
                                                    i18n: '6b',
                                                    content: [
                                                        {
                                                            type: 'bool',
                                                            name: '7a',
                                                            i18n: '7a'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ];

    test.for([
        ({ settings: [], path: ['a'], expected: undefined }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            }
        ], path: ['1a'], expected: {
            type: 'bool',
            name: '1a',
            i18n: '1a'
        } }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    }
                ]
            }
        ], path: ['1a'], expected: {
            type: 'bool',
            name: '1a',
            i18n: '1a'
        } }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    }
                ]
            }
        ], path: ['1b', '2a'], expected: {
            type: 'bool',
            name: '2a',
            i18n: '2a'
        } }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'number',
                        name: '2b',
                        i18n: '2b',
                        default: 42
                    }
                ]
            }
        ], path: ['1b', '2b'], expected: {
            type: 'number',
            name: '2b',
            i18n: '2b',
            default: 42
        } }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1b', '2b', '3a'], expected: {
            type: 'string',
            name: '3a',
            i18n: '3a'
        } }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1b'], expected: {
            type: 'section',
            name: '1b',
            i18n: '1b',
            content: [
                {
                    type: 'bool',
                    name: '2a',
                    i18n: '2a'
                },
                {
                    type: 'section',
                    name: '2b',
                    i18n: '2b',
                    content: [
                        {
                            type: 'string',
                            name: '3a',
                            i18n: '3a'
                        }
                    ]
                }
            ]
        } }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1b', '2b'], expected: {
            type: 'section',
            name: '2b',
            i18n: '2b',
            content: [
                {
                    type: 'string',
                    name: '3a',
                    i18n: '3a'
                }
            ]
        } }),

        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1b', '2b', '3b'], expected: undefined }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1b', '2a', '3a'], expected: undefined }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1b', '2c', '3a'], expected: undefined }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1a', '2b', '3a'], expected: undefined }),
        ({ settings: [
            {
                type: 'bool',
                name: '1a',
                i18n: '1a'
            },
            {
                type: 'section',
                name: '1b',
                i18n: '1b',
                content: [
                    {
                        type: 'bool',
                        name: '2a',
                        i18n: '2a'
                    },
                    {
                        type: 'section',
                        name: '2b',
                        i18n: '2b',
                        content: [
                            {
                                type: 'string',
                                name: '3a',
                                i18n: '3a'
                            }
                        ]
                    }
                ]
            }
        ], path: ['1c', '2b', '3a'], expected: undefined }),
        ({ settings: veryNestedSettingsList, path: ['1b', '2b', '3b', '4b', '5b', '6b', '7a'], expected: {
            type: 'bool',
            name: '7a',
            i18n: '7a'
        } }),
        ({ settings: veryNestedSettingsList, path: ['1b', '2b', '3b', '4b', '5b'], expected: {
            type: 'section',
            name: '5b',
            i18n: '5b',
            content: [
                {
                    type: 'bool',
                    name: '6a',
                    i18n: '6a'
                },
                {
                    type: 'section',
                    name: '6b',
                    i18n: '6b',
                    content: [
                        {
                            type: 'bool',
                            name: '7a',
                            i18n: '7a'
                        }
                    ]
                }
            ]
        } }),
        ({ settings: veryNestedSettingsList, path: ['1b', '2b', '3b', '4ba', '5b', '6b', '7a'], expected: undefined })
    ])('returns $expected', ({ settings, path, expected }) => {
        expect(getSettingRecursively(path, settings)).toStrictEqual(expected);
    });
});
