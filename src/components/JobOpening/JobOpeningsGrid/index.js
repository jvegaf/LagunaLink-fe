import { findByLabelText } from '@testing-library/react';
import React, { Fragment } from 'react'
import { CardDeck } from 'react-bootstrap';
import { JobOpeningCard } from '../JobOpeningCard';

export const JobOpeningsGrid = (props) => {
  
  // const items = props.items;
  const items = [
    {
      "_id": "5fab2af3dd32681b43c8a92b",
      "index": 0,
      "guid": "9ce96bc6-b550-43db-bb0a-1b2baa4f2405",
      "title": "proident dolore",
      "company": "NORSUL",
      "position": "Eiusmod eiusmod adipisicing in dolor mollit. Officia deserunt amet ex nisi deserunt laborum fugiat nostrud reprehenderit adipisicing in dolor excepteur occaecat. Sunt in anim elit dolor consectetur cillum excepteur tempor. Irure in eu ut ex ad occaecat minim anim in quis ut adipisicing ex aute. Nulla veniam culpa in non aliquip aliquip laboris. Magna non et nulla proident est veniam tempor voluptate occaecat."
    },
    {
      "_id": "5fab2af3c3f2372aa4b4ee82",
      "index": 1,
      "guid": "e0e643f8-85fa-4c05-88f0-6eff8fe3704e",
      "title": "officia aute",
      "company": "ORBIXTAR",
      "position": "Elit amet irure labore amet aliquip magna anim laborum aliqua occaecat. Ipsum laborum enim in adipisicing elit. Officia commodo quis culpa magna veniam. Ut esse et anim laboris laborum duis do ad aute nisi."
    },
    {
      "_id": "5fab2af3f8be08106624ae7b",
      "index": 2,
      "guid": "84047d9d-977f-4a13-8701-870fe505d68c",
      "title": "velit labore",
      "company": "MITROC",
      "position": "Consequat cupidatat non est sit dolor veniam ut tempor ipsum minim sint id. Reprehenderit reprehenderit quis proident elit anim tempor magna esse minim tempor nulla. Consectetur labore sunt aute mollit amet cupidatat fugiat id laborum. Dolor labore occaecat sunt aliqua ipsum. Et proident occaecat veniam dolor velit enim sunt ullamco nostrud enim adipisicing ea eiusmod tempor. Nulla cillum quis nisi amet."
    },
    {
      "_id": "5fab2af3207c23aecf1dfd05",
      "index": 3,
      "guid": "03a5a096-3def-481e-bfb7-7cf703a88a5f",
      "title": "ea laborum",
      "company": "ECRATER",
      "position": "Et dolore irure quis nisi occaecat incididunt laboris excepteur. Consectetur fugiat cillum ex duis quis dolore adipisicing proident commodo labore elit. Elit sunt incididunt tempor labore. Eiusmod aute amet ullamco aliquip. Fugiat sunt proident culpa irure esse. Elit mollit nulla duis deserunt consectetur tempor qui commodo consectetur tempor elit commodo dolor irure."
    },
    {
      "_id": "5fab2af3f1f17a1b08216866",
      "index": 4,
      "guid": "a7621af6-a04a-4aff-9c96-84a5ab3ca983",
      "title": "pariatur elit",
      "company": "DELPHIDE",
      "position": "Nulla esse proident non laboris eu adipisicing sit laborum minim et proident. Cupidatat aute et irure dolore. Adipisicing magna sit laboris magna. Ut est mollit adipisicing irure reprehenderit dolore culpa ipsum excepteur ad amet tempor reprehenderit ut."
    },
    {
      "_id": "5fab2af37046a4d37f72954c",
      "index": 5,
      "guid": "af49294a-ded3-4320-b6e9-cc58d8daff9b",
      "title": "labore anim",
      "company": "IMMUNICS",
      "position": "Lorem adipisicing consectetur consectetur Lorem sit minim aliquip occaecat. Qui et ut deserunt cupidatat tempor ut adipisicing velit pariatur cillum aute eiusmod tempor. Commodo cillum minim dolor duis commodo excepteur sint aliquip. Pariatur nostrud officia ea sint amet nisi nulla et ut exercitation consequat. Adipisicing deserunt deserunt ullamco non tempor incididunt reprehenderit nulla in anim laboris exercitation."
    },
    {
      "_id": "5fab2af3ab63378dffa32a2d",
      "index": 6,
      "guid": "0134e485-f89e-4590-8fed-8168726f3ad1",
      "title": "occaecat non",
      "company": "GADTRON",
      "position": "Quis cupidatat sint fugiat mollit irure cillum. Enim cupidatat irure amet laboris dolore consequat. Irure veniam nostrud laboris sint amet labore eu ut. Ullamco labore laboris tempor deserunt Lorem ipsum culpa."
    },
    {
      "_id": "5fab2af3336e2f712850a55c",
      "index": 7,
      "guid": "3ebf2b49-d522-4178-92e8-ce38d608963e",
      "title": "do enim",
      "company": "CEPRENE",
      "position": "Elit irure quis irure sint aute veniam nulla ullamco sint. Cupidatat culpa aliqua consequat culpa occaecat. Ex ut anim Lorem in tempor ullamco magna ipsum voluptate sunt sint. Eu deserunt consequat qui do est magna sit deserunt dolor culpa quis sunt."
    }
  ];
  
  return (
      <div className="d-flex flex-wrap justify-content-strech">
        {items.map(item => <JobOpeningCard key={item._id} item={item} />)}
      </div>
  )
}
