export const resources = {
  en: {
    translation: {
      Back: 'Back',
      Loading: 'Loading...',
      Cancel: 'Cancel',
      EmptyListItems: {
        Header: 'Shelf for your books and other items',
        Description:
          'Go to the search section and choose the one that suits you',
      },
      InstructionsClaim: {
        Header: 'Did you find something interesting to claim?',
        Description:
          'Use the mobile version of the application and quickly and easily take books and other items with this application',
      },
      NavbarReader: {
        Home: 'Home',
        Library: 'Library',
        'Donate to the library': 'Donate to the library',
        'History of claim': 'History of claim',
        'History of donate': 'History of donate',
        Settings: 'Settings',
        'Log out': 'Log out',
      },
      NavbarManager: {
        Home: 'Home',
        Readers: 'Readers',
        Library: 'Library',
        'Donates from user': 'Donates from user',
        'Add item to library': 'Add item to library',
        Settings: 'Settings',
        'Log out': 'Log out',
      },
      Search: {
        Placeholder: 'Search by book or author',
        Scan: 'Scan a code',
        UsernamePlaceholder: 'Search by user name',
        Books: 'Books',
        Other: 'Other',
        NotFound: 'Nothing was found',
      },
      Start: {
        ChooseLocation: 'Your current location',
      },
      Settings: {
        Title: 'Settings',
        Desc: 'Make applications as comfortable as possible for yourself! All changes are saved automatically',
        Location: 'Location',
        Locations: 'Locations',
        Several: 'you can choose several',
        Language: 'Language',
        Notification: 'Notification',
      },
      Statistics: {
        Title: 'Library statistics',
      },
      Readers: {
        Title: 'All users',
        Description:
          'For detailed information and interaction with the user, go to his card',
        SingleUser: {
          ClaimHistory: 'Claim history:',
          ClaimNow: 'Claim now:',
          Item: 'item',
          Items: 'items',
        },
        TitleFiltered: 'Results',
      },
      ManagerInfoCard: {
        Title: {
          Overdue: 'Overdue',
          Donates: 'Donates',
          Notifications: 'New user notifications',
        },
        Description: {
          Overdue: 'The following users have not turned in their books',
          Donates: 'New arrivals awaiting your confirmation',
          Notifications: 'Problems faced by users',
          More: 'more',
          Library: 'Open library statistics',
        },
        Link: {
          Overdue: 'See all overdue',
          Donates: 'See all donates',
          Notifications: 'See all notifications',
          Answer: 'Answer',
        },
        FieldDescription: {
          Overdue: 'Was overdue by',
          Donates: 'Was donated by',
        },
      },
      UserCard: {
        Position: 'Position:',
        Table: {
          AllItems: 'All items',
          ReturnTill: 'Return till:',
          ReturnedAt: 'Returned at:',
          ItemName: 'Item name',
          Deadline: 'Deadline',
          State: 'State',
          Overdue: 'Overdue',
          Returned: 'Returned',
          Claim: 'Claim',
          Prolong: 'Prolong',
          ShelfOf: 'Shelf of ',
          BooksAndItems: "'s books and other items",
        },
        ClaimList: 'Claim list',
        ClaimListDescription:
          'List of all items user have taken for all the time',
        Notifications: 'Notifications',
        NotificationsDescription: 'All notifications sent by the user',
        BlockReason: 'Reason for blocking: ',
        Today: 'Today',
        Earlier: 'Earlier',
        BlockUser: 'Block user',
        UnblockUser: 'Unblock user',
        CreateNotification: 'Create notification',
        NotificationAnswers: {
          MissedDate:
            'You have missed the due date for your book. Return it as soon as possible or contact the manager.',
          AcceptedDonation:
            'We have accepted your donation to the library! Thank you!',
          Banned:
            "If you don't check out all expired items in the library within a week, you will be banned from the app",
        },
        MakeManager: 'Make manager',
        MakeReader: 'Make reader',
        hAgo: 'h ago',
        mAgo: 'm ago',
        now: 'now',
        dAgo: 'd ago',
      },
      Notifications: {
        Managers: {
          MainTitle: 'Notifications',
          MainDescription: 'New notifications are waiting for you',
        },
        Today: 'Today',
        Earlier: 'Earlier',
      },
      PopUps: {
        NotFoundByIdentifier:
          "Sorry, we didn't find a book with that identifier",
      },
      Block: {
        Warning: 'Warning!',
        YBlock: 'Yes, block',
        YUnblock: 'Yes, unblock',
        SureUnblock: 'Are you sure you want to unblock the user ',
        SureBlock: 'Are you sure you want to block the user ',
        InLibrary: ' in library?',
        BlockUser: 'Block user',
        Reason: 'Specify the reason for the block. User will be able to see it',
        TooManyDebts: 'Too many debts',
        Fired: 'The user has been fired',
        Other: 'Other reason',
        FullOther: 'Other reason (specify in message)',
        Opps: 'Opps! Your page has been blocked',
        ReasonForBlock: 'Reason for blocking:',
      },
      ClaimHistory: {
        Title: 'History of your claim',
        Desc: 'List of items you have taken for all time',
      },
      AnswerModal: {
        TitleReply: 'Reply to notification',
        TitleCreate: 'Create notification',
        SubTitle: 'Choose a ready-made message or write your own:',
        DescMessage: 'Own message:',
        SendBtn: 'Send notification',
      },
      DonateHistory: {
        Title: 'History of your donate',
        Desc: 'List of items you have donated to the library',
      },
      Statuses: {
        Overdue: 'Overdue',
        'Free/history-of-claim': 'Returned',
        'Free/history-of-donate': 'Received',
        Free: 'On the shelf',
        Busy: 'Return till: ',
        Prolong: 'Return till: ',
        Pending: 'Waiting for a manger',
        Rejected: 'Rejected',
        Claimed: 'In use',
      },
      BookClaimHistory: {
        Title: 'Claim history',
        Desc: 'List of users who bought this item',
      },
      PlaceholderTitle: {
        Donate: 'No donations',
        Overdue: 'Everything seems to be ok',
        Notifications: 'There are no notifications for you',
      },
      ErrorType: {
        MainHeader: 'OOPS SORRY!',
        SecondaryHeader: 'SOMETHING WENT WRONG!',
        Description:
          'It seems the action failed. Please try again later  We will try to fix this error',
        TitleButton: 'Go back home',
      },
      SearchModal: {
        Title: 'Filters',
        SeeAll: 'See all',
        SeeLess: 'See less',
        ShowResults: 'Results',
        Reset: 'Reset',
        ItemFilter: {
          SortBy: 'Sort By',
          Items: 'Items',
          Availability: 'Availability',
          Categories: 'Categories',
          Authors: 'Authors',
          DateAdded: 'By date added',
          DateWriting: 'By date of writing',
        },
        UsersFilter: {
          TakenItems: 'How many items did the user take?',
          Nothing: 'Nothing',
          TenItems: '2 - 10 items',
          MoreThanTen: '10 or more items',
          All: 'All',
          SortBy: 'Sort by',
          Alphabetical: 'By alphabet',
          ThingsTaken: 'Number of things taken',
          OverdueDeals: 'Number of overdue deals',
        },
      },
      DonateItem: {
        Title: 'Are you planning to donate something to the library?',
        Description: 'Fill in the required* fields or try to scan the code',
        Inputs: {
          Name: {
            Title: 'Name',
            Placeholder: 'Book name',
          },
          Author: {
            Title: 'Author',
            Placeholder: 'Book author',
          },
          Genre: {
            Title: 'Genre',
            Placeholder: 'Book genre',
          },
          Location: {
            Title: 'Location',
            Placeholder: 'Choose book location',
          },
          Description: {
            Title: 'Description',
            Placeholder: 'Enter book description',
          },
        },
        Modal: {
          ISBNError: {
            Title: 'ISBN is not known',
            Message:
              'We did not find a suitable book code :(\n' +
              'But you can still donate to the library by filling in the information manually',
          },
          DonateSuccess: {
            Title: 'You have successfully donated to the library',
            Message:
              'Put the book on the nearest free space on the shelf. In case of any problems, our manager will contact you',
          },
          ProblemReported: {
            Title: 'We reported the problem to the manager',
            Message: 'The problem will be solved soon',
          },
        },
        Button: {
          AddItem: 'Add item to library',
          AskManager: 'Ask a manager',
        },
      },
    },
  },
  ru: {
    translation: {
      Back: 'Назад',
      Loading: 'Загрузка...',
      Cancel: 'Закрыть',
      EmptyListItems: {
        Header: 'Полка для ваших книг и других предметов',
        Description:
          'Зайдите в раздел поиска и выберите подходящий Вам предмет',
      },
      InstructionsClaim: {
        Header: 'Вы нашли что-нибудь интересное?',
        Description:
          'Используйте мобильную версию приложения и быстро и легко берите книги и другие предметы с этим приложением',
      },
      NavbarReader: {
        Home: 'Домой',
        Library: 'Библиотека',
        'Donate to the library': 'Пожертвовать библиотеке',
        'History of claim': 'История клеймов',
        'History of donate': 'История донатов',
        Settings: 'Настройки',
        'Log out': 'Выход',
      },
      NavbarManager: {
        Home: 'Домой',
        Readers: 'Читатели',
        Library: 'Библиотека',
        'Donates from user': 'Донаты от пользователей',
        'Add item to library': 'Создать новый предмет',
        Settings: 'Настройки',
        'Log out': 'Выход',
      },
      Search: {
        Placeholder: 'Поиск по книге или автору',
        Scan: 'Сканировать',
        UsernamePlaceholder: 'Поиск по имени пользователя',
        Books: 'Книги',
        Other: 'Другое',
        NotFound: 'Ничего не было найдено',
      },
      Start: {
        ChooseLocation: 'Ваше текущее местоположение',
      },
      Settings: {
        Title: 'Настройки',
        Desc: 'Сделайте приложения максимально комфортными для себя! Все изменения сохраняются автоматически',
        Location: 'Местоположение',
        Locations: 'Местоположения',
        Several: 'вы можете выбрать несколько',
        Language: 'Язык',
        Notification: 'Уведомления',
      },
      Statistics: {
        Title: 'Статистика библиотеки',
      },
      Readers: {
        Title: 'Все пользователи',
        TitleFiltered: 'Результаты поиска ',
        Description:
          'Для подробной информации и взаимодействия с пользователем, перейдите к его карточке',
        SingleUser: {
          ClaimHistory: 'История:',
          ClaimNow: 'На руках:',
          Item: 'предмет',
          Items: 'предмета',
        },
      },
      ManagerInfoCard: {
        Title: {
          Overdue: 'Просроченные',
          Donates: 'Пожертвования',
          Notifications: 'Новые уведомления от пользователей',
        },
        Description: {
          Overdue: 'Эти пользователи не вернули свои книги вовремя',
          Donates: 'Новые поступления от пользователей',
          Notifications: 'Проблемы, описанные пользователями',
          More: 'ещё',
          Library: 'Открыть статистику библиотеки',
        },
        Link: {
          Overdue: 'Все просроченные',
          Donates: 'Все пожертвования',
          Notifications: 'Все уведомления',
          Answer: 'Ответить',
        },
        FieldDescription: {
          Overdue: 'Просрочил:',
          Donates: 'Пожертвовал:',
        },
      },
      UserCard: {
        Position: 'Должность:',
        Table: {
          AllItems: 'Все вещи',
          ReturnTill: 'Вернуть до:',
          ReturnedAt: 'Было возвращено:',
          ItemName: 'Название',
          Deadline: 'Срок возвращения',
          State: 'Статус',
          Overdue: 'Просрочено',
          Returned: 'Возвращено',
          Claim: 'На руках',
          Prolong: 'Продлено',
          ShelfOf: 'Полка книг и вещей пользователя ',
          BooksAndItems: '',
        },
        ClaimList: 'Список взятых вещей',
        ClaimListDescription:
          'Список всех вещей, которые когда-либо брал пользователь',
        Notifications: 'Уведомления',
        NotificationsDescription: 'Все уведомления от пользователя',
        BlockReason: 'Причина блокировки: ',
        Today: 'Сегодня',
        Earlier: 'Ранее',
        BlockUser: 'Заблокировать',
        UnblockUser: 'Разблокировать',
        CreateNotification: 'Создать уведомление',
        NotificationAnswers: {
          MissedDate:
            'Вы пропустили срок сдачи книги. Верните его как можно скорее или свяжитесь с менеджером.',
          AcceptedDonation:
            'Мы приняли ваше пожертвование в пользу библиотеки! Благодарю вас!',
          Banned:
            'Если вы не изучите все просроченные книги в библиотеке в течение недели, вы будете заблокированы в приложении.',
        },
        MakeManager: 'Сделать менеджером',
        MakeReader: 'Сделать читателем',
        hAgo: 'ч назад',
        mAgo: 'м назад',
        now: 'сейчас',
        dAgo: 'д назад',
      },
      Notifications: {
        Managers: {
          MainTitle: 'Уведомления',
          MainDescription: 'Новые уведомления ждут вас',
        },
        Today: 'Сегодня',
        Earlier: 'Ранее',
      },
      PopUps: {
        NotFoundByIdentifier: 'Упс, мы не нашли книгу с таким идентификатором',
      },
      Block: {
        Warning: 'Внимание!',
        YBlock: 'Да, заблокировать',
        YUnblock: 'Да, разблокировать',
        SureUnblock: 'Вы уверены, что хотите разблокировать пользователя ',
        SureBlock: 'Вы уверены, что хотите заблокировать пользователя ',
        InLibrary: ' в библиотеке?',
        BlockUser: 'Заблокировать пользователя',
        Reason: 'Опишите причину блокировки. Пользователь увидит её',
        TooManyDebts: 'Слишком много долгов',
        Fired: 'Пользователь был уволен',
        Other: 'Другая причина',
        FullOther: 'Другая причина (опишите в сообщении)',
        Opps: 'Упс! Ваша страница заблокирована',
        ReasonForBlock: 'Причина блокировки:',
      },
      ClaimHistory: {
        Title: 'История взятых вами книг',
        Desc: 'Список предметов, которые вы взяли за все время',
      },
      AnswerModal: {
        TitleReply: 'Ответить на уведомление',
        TitleCreate: 'Создать уведомление',
        SubTitle: 'Выберите готовое сообщение или напишите свое собственное:',
        DescMessage: 'Собственное сообщение:',
        SendBtn: 'Отправить уведомление',
      },
      DonateHistory: {
        Title: 'История ваших пожертвований',
        Desc: 'Список вещей, пожертвованных вами в библиотеку',
      },
      Statuses: {
        Overdue: 'Просрочено',
        'Free/history-of-claim': 'Возвращено',
        'Free/history-of-donate': 'Принято',
        Free: 'На полке',
        Busy: 'Вернуть до: ',
        Prolong: 'Вернуть до: ',
        Pending: 'В ожидании менеджера',
        Rejected: 'Отклонено',
        Claimed: 'Используется',
      },
      BookClaimHistory: {
        Title: 'История действий',
        Desc: 'Список пользователей, взаимодействовавших с книгой',
      },
      PlaceholderTitle: {
        Donate: 'Без пожертвований',
        Overdue: 'Кажется, все в порядке',
        Notifications: 'Для вас нет никаких уведомлений',
      },
      ErrorType: {
        MainHeader: 'ОЙ, ИЗВИНИТЕ!',
        SecondaryHeader: 'ЧТО-ТО ПОШЛО НЕ ТАК!',
        Description:
          'Похоже, что действие не удалось. Пожалуйста, повторите попытку позже. Мы постараемся исправить эту ошибку',
        TitleButton: 'Возвращайтесь на главную',
      },
      SearchModal: {
        Title: 'Фильтры',
        SeeAll: 'Посмотреть все',
        SeeLess: 'Скрыть',
        ShowResults: 'Результаты поиска',
        Reset: 'Сбросить',
        ItemFilter: {
          SortBy: 'Сортировать по',
          Items: 'Предметы',
          Availability: 'Доступность',
          Categories: 'Категории',
          Authors: 'Авторы',
          DateAdded: 'Дата добавления',
          DateWriting: 'Дата написания',
        },
        UsersFilter: {
          TakenItems: 'Сколько взято предметов',
          Nothing: 'Ничего',
          TenItems: '2 - 10 предметов',
          MoreThanTen: '10 или больше',
          All: 'Все',
          SortBy: 'Сортировать по',
          Alphabetical: 'Алфавиту',
          ThingsTaken: 'Количеству взятых предметов',
          OverdueDeals: 'Количеству просроченных сделок',
        },
      },
      DonateItem: {
        Title: 'Планируете ли вы что-то пожертвовать библиотеке?',
        Description:
          'Заполните обязательные* поля или попробуйте отсканировать код',
        Inputs: {
          Name: {
            Title: 'Название',
            Placeholder: 'Название книги',
          },
          Author: {
            Title: 'Автор',
            Placeholder: 'Автор книги',
          },
          Genre: {
            Title: 'Жанр',
            Placeholder: 'Жанр книги',
          },
          Location: {
            Title: 'Местоположение',
            Placeholder: 'Выберите местоположение книги',
          },
          Description: {
            Title: 'Описание',
            Placeholder: 'Введите описание книги',
          },
        },
        Modal: {
          ISBNError: {
            Title: 'ISBN не найден',
            Message:
              'Мы не смогли найти подходящий код книги :(\n' +
              'Но вы все равно можете пожертвовать библиотеке, заполнив информацию вручную',
          },
          DonateSuccess: {
            Title: 'Вы успешно пожертвовали библиотеке',
            Message:
              'Поставьте книгу на ближайшее свободное место на полке. В случае возникновения проблем наш менеджер свяжется с вами',
          },
          ProblemReported: {
            Title: 'Мы сообщили о проблеме менеджеру',
            Message: 'Проблема будет решена в ближайшее время',
          },
        },
        Button: {
          AddItem: 'Добавить в библиотеку',
          AskManager: 'Спросить у менеджера',
        },
      },
    },
  },
};
