export type Exercise = {
  id: number
  group: number
  original: string
  corrected: string
  alternatives?: string[]
  correctAsWritten?: boolean
}

type SourceExercise = Omit<Exercise, 'id'>

const source: SourceExercise[] = [
  // Group 1
  { group: 1, original: 'The table shows number of people working in Britain in 1976.', corrected: 'The table shows the number of people working in Britain in 1976.' },
  { group: 1, original: 'The news were very upsetting.', corrected: 'The news was very upsetting.' },
  { group: 1, original: 'The government spent ten millioins dollars on educaiton last year.', corrected: 'The government spent ten million dollars on education last year.' },
  { group: 1, original: 'There have very good restuarants and shops on board the ship.', corrected: 'There are very good restaurants and shops on board the ship.' },
  { group: 1, original: 'To really help the environment, we need to change the way we think or behave.', corrected: 'To really help the environment, we need to change the way we think and behave.' },
  { group: 1, original: 'I look forward to hear your reply.', corrected: 'I look forward to hearing your reply.' },
  { group: 1, original: 'The percentage in women attending university is increasing.', corrected: 'The percentage of women attending university is increasing.' },
  { group: 1, original: 'The cans filled with soup and then labels attached.', corrected: 'The cans are filled with soup and then labels are attached.' },
  { group: 1, original: 'It is clearly that people without money do not have as much freedom.', corrected: 'It is clear that people without money do not have as much freedom.' },
  { group: 1, original: 'Last summer I learned with you on the course.', corrected: 'Last summer I studied with you on the course.' },

  // Group 2
  { group: 2, original: 'The hotel did not look same as the photo on your website.', corrected: 'The hotel did not look the same as the photo on your website.' },
  { group: 2, original: 'My father watch a lot of sport on TV.', corrected: 'My father watches a lot of sport on TV.' },
  { group: 2, original: 'The local museum has objects that are more than two thousands years old.', corrected: 'The local museum has objects that are more than two thousand years old.' },
  { group: 2, original: 'There is a pan of soup and are some bowls in the kitchen.', corrected: 'There is a pan of soup and there are some bowls in the kitchen.' },
  { group: 2, original: "I don't have tea and coffee.", corrected: "I don't have tea or coffee." },
  { group: 2, original: 'We spent over $300 to buy food for the party.', corrected: 'We spent over $300 buying food for the party.' },
  { group: 2, original: 'I am pleased with your new job.', corrected: 'I am pleased about your new job.' },
  { group: 2, original: 'The class allowed to eat in the staff dining room during the renovations.', corrected: 'The class was allowed to eat in the staff dining room during the renovations.' },
  { group: 2, original: 'He ran as fastly as he could.', corrected: 'He ran as fast as he could.' },
  { group: 2, original: 'I am learning for the test.', corrected: 'I am studying for the test.' },

  // Group 3
  { group: 3, original: 'People with reading difficulties often have problems with the numbers.', corrected: 'People with reading difficulties often have problems with numbers.' },
  { group: 3, original: 'There were already a little furniture in the flat.', corrected: 'There was already a little furniture in the flat.' },
  { group: 3, original: 'Three and a half a billion people watched the ceremony on TV.', corrected: 'Three and a half billion people watched the ceremony on TV.' },
  { group: 3, original: 'There is no electricity and are no factories in this area.', corrected: 'There is no electricity and there are no factories in this area.' },
  { group: 3, original: 'If you study in a country such as Australia, England and America, your English will improve dramatically.', corrected: 'If you study in a country such as Australia, England or America, your English will improve dramatically.' },
  { group: 3, original: "When I was a student, we couldn't afford to buy new textbooks.", corrected: "When I was a student, we couldn't afford to buy new textbooks.", correctAsWritten: true },
  { group: 3, original: 'The company agreed to the pay rise.', corrected: 'The company agreed to the pay rise.', correctAsWritten: true },
  { group: 3, original: 'The museum was renovated when we were there, so we could not visit it.', corrected: 'The museum was being renovated when we were there, so we could not visit it.' },
  { group: 3, original: 'We must act quick.', corrected: 'We must act quickly.' },
  { group: 3, original: 'Jane is learning in London this year.', corrected: 'Jane is studying in London this year.' },

  // Group 4
  { group: 4, original: 'Number eight is considered lucky in some countries.', corrected: 'The number eight is considered lucky in some countries.' },
  { group: 4, original: 'He gave me one very good advice about how to study.', corrected: 'He gave me one very good piece of advice about how to study.' },
  { group: 4, original: 'Real estate in my city is very expensive; a small house can cost three quarters of a million dollars.', corrected: 'Real estate in my city is very expensive; a small house can cost three quarters of a million dollars.', correctAsWritten: true },
  { group: 4, original: "It is a very small village so there don't have any large supermarkets.", corrected: "It is a very small village so there aren't any large supermarkets." },
  { group: 4, original: 'I am totally agree with you.', corrected: 'I totally agree with you.' },
  { group: 4, original: 'The new machine keeps break, which is causing a lot of delays.', corrected: 'The new machine keeps breaking, which is causing a lot of delays.' },
  { group: 4, original: "I'm thinking of going back to university next year to finish my degree.", corrected: "I'm thinking of going back to university next year to finish my degree.", correctAsWritten: true },
  { group: 4, original: 'New employees have instructed not to operate the photocopier until they are trained.', corrected: 'New employees have been instructed not to operate the photocopier until they are trained.' },
  { group: 4, original: "I'm afraid I can't come to the party because I am studying hardly for my final exams.", corrected: "I'm afraid I can't come to the party because I am studying hard for my final exams." },
  { group: 4, original: 'I am studying how to play the piano.', corrected: 'I am learning how to play the piano.' },

  // Group 5
  { group: 5, original: 'The main advantage of internet is that it gives us access to information from all over the world.', corrected: 'The main advantage of the internet is that it gives us access to information from all over the world.' },
  { group: 5, original: 'When we visited the park, we were upset to see so many gargabes left there.', corrected: 'When we visited the park, we were upset to see so much garbage left there.' },
  { group: 5, original: 'International aids are very important after natural disasters.', corrected: 'International aid is very important after natural disasters.' },
  { group: 5, original: 'In 2018 there was three million people working in this industry.', corrected: 'In 2018 there were three million people working in this industry.' },
  { group: 5, original: 'I am not agree with this idea.', corrected: 'I do not agree with this idea.' },
  { group: 5, original: 'In restaurants, I sometimes spend a long time to choose what I want to eat.', corrected: 'In restaurants, I sometimes spend a long time choosing what I want to eat.' },
  { group: 5, original: 'What are you thinking about doing in the school holidays?', corrected: 'What are you thinking about doing in the school holidays?', correctAsWritten: true },
  { group: 5, original: 'Many people have been died because of this disease.', corrected: 'Many people have died because of this disease.' },
  { group: 5, original: "I didn't play very good in our last football match.", corrected: "I didn't play very well in our last football match." },
  { group: 5, original: "We're studying about World War I this term.", corrected: "We're learning about World War I this term." },

  // Group 6
  { group: 6, original: 'My father has fished in rivers all over Canada.', corrected: 'My father has fished in rivers all over Canada.', correctAsWritten: true },
  { group: 6, original: 'We arrived late because there were so many traffic on the road.', corrected: 'We arrived late because there was so much traffic on the road.' },
  { group: 6, original: 'She had two bridesmaids in pink dress.', corrected: 'She had two bridesmaids in pink dresses.' },
  { group: 6, original: 'You should do that what you think is right.', corrected: 'You should do what you think is right.' },
  { group: 6, original: "Don't worry. You haven't to buy a ticket. I have an extra one.", corrected: "Don't worry. You don't have to buy a ticket. I have an extra one." },
  { group: 6, original: "I've decided studying medicine at university.", corrected: "I've decided to study medicine at university." },
  { group: 6, original: "Let's meet on the weekend.", corrected: "Let's meet at the weekend." },
  { group: 6, original: 'Companies waste heaps of money on advertising.', corrected: 'Companies waste a great deal of money on advertising.' },
  { group: 6, original: 'Male employees far outnumber the women.', corrected: 'Male employees far outnumber the females.' },
  { group: 6, original: 'Before you can fly a plane, you need to learn how to land.', corrected: 'Before you can fly a plane, you need to learn how to land.', correctAsWritten: true },

  // Group 7
  { group: 7, original: 'Life in the Australia is very different from life in my country.', corrected: 'Life in Australia is very different from life in my country.' },
  { group: 7, original: "I couldn't wait to visit the market and do a few shopping.", corrected: "I couldn't wait to visit the market and do some shopping." },
  { group: 7, original: 'The guests arrive in evening dress.', corrected: 'The guests arrive in evening dress.', correctAsWritten: true },
  { group: 7, original: 'There are several factors are important in achieving happiness.', corrected: 'There are several factors that are important in achieving happiness.' },
  { group: 7, original: "We don't should accept this situation any longer.", corrected: 'We should not accept this situation any longer.' },
  { group: 7, original: 'Our teacher suggested to have a barbecue on the last day of term.', corrected: 'Our teacher suggested having a barbecue on the last day of term.' },
  { group: 7, original: 'Shall we meet in the cinema?', corrected: 'Shall we meet at the cinema?' },
  { group: 7, original: 'Some people believe it is OK to hit small children.', corrected: 'Some people believe it is acceptable to hit small children.', alternatives: ['Some people believe it is all right to hit small children.'] },
  { group: 7, original: 'We can encourage more people to exercise by making sport equipment cheaper.', corrected: 'We can encourage more people to exercise by making sports equipment cheaper.' },
  { group: 7, original: 'The flow chart displays the quantity of electricity consumed each year.', corrected: 'The flow chart shows the quantity of electricity consumed each year.' },

  // Group 8
  { group: 8, original: 'According to the graph, the number of people moving into the city each year has more than doubled.', corrected: 'According to the graph, the number of people moving into the city each year has more than doubled.', correctAsWritten: true },
  { group: 8, original: 'A lot of food in restaurants are thrown away every day.', corrected: 'A lot of food in restaurants is thrown away every day.' },
  { group: 8, original: 'She has 20 years of experiences as a nurse.', corrected: 'She has 20 years of experience as a nurse.' },
  { group: 8, original: 'My manager has asked me to find someone can help with the new project.', corrected: 'My manager has asked me to find someone who can help with the new project.' },
  { group: 8, original: "We haven't to stop using cars altogether but we do have to use them less often.", corrected: "We don't have to stop using cars altogether but we do have to use them less often." },
  { group: 8, original: 'Young children often feel shy to talk to adults.', corrected: 'Young children often feel shy talking to adults.' },
  { group: 8, original: "I'm going to talk about an article I read on the newspaper.", corrected: "I'm going to talk about an article I read in the newspaper." },
  { group: 8, original: 'Kids today are much more comfortable using technology than older people.', corrected: 'Children today are much more comfortable using technology than older people.' },
  { group: 8, original: 'The advice my tutor gave me was unvaluable in the exam.', corrected: 'The advice my tutor gave me was invaluable in the exam.' },
  { group: 8, original: 'Most shops use shelves to show their products.', corrected: 'Most shops use shelves to display their products.' },

  // Group 9
  { group: 9, original: 'Obesity is much more common in USA than in my country.', corrected: 'Obesity is much more common in the USA than in my country.' },
  { group: 9, original: 'There are a lot of similarity between your country and mine.', corrected: 'There are a lot of similarities between your country and mine.' },
  { group: 9, original: 'It has excellent facilities, with all the latest equipments.', corrected: 'It has excellent facilities, with all the latest equipment.' },
  { group: 9, original: 'The teacher inspired me most was called Shelfom Roc.', corrected: 'The teacher who inspired me most was called Shelfom Roc.', alternatives: ['The teacher that inspired me most was called Shelfom Roc.'] },
  { group: 9, original: 'I suggest you updating the information on your website.', corrected: 'I suggest you update the information on your website.' },
  { group: 9, original: 'New students do not always feel comfortable to speak English to other people.', corrected: 'New students do not always feel comfortable speaking English to other people.' },
  { group: 9, original: 'Our standard for living is much better than in the past.', corrected: 'Our standard of living is much better than in the past.' },
  { group: 9, original: 'The female employees tend to go out more during their lunch break than the guys.', corrected: 'The female employees tend to go out more during their lunch break than the males.' },
  { group: 9, original: 'In some countries, there are no women members of parliament.', corrected: 'In some countries, there are no female members of parliament.' },
  { group: 9, original: 'Those who do manual work often earn less wages.', corrected: 'Those who do manual work often earn less money.' },

  // Group 10
  { group: 10, original: 'The graph shows that greatest increase occurred in 1999.', corrected: 'The graph shows that the greatest increase occurred in 1999.' },
  { group: 10, original: 'The number of students going on to higher education have increased.', corrected: 'The number of students going on to higher education has increased.' },
  { group: 10, original: 'How often do you use public tranpsorts?', corrected: 'How often do you use public transport?' },
  { group: 10, original: 'The plan is on the left shows the town in the year 1880.', corrected: 'The plan on the left shows the town in the year 1880.', alternatives: ['The plan that is on the left shows the town in the year 1880.'] },
  { group: 10, original: 'This ticket will permit that you enter the museum as many times as you like.', corrected: 'This ticket will permit you to enter the museum as many times as you like.' },
  { group: 10, original: 'They decided to rent a flat instead of stay in a hotel.', corrected: 'They decided to rent a flat instead of staying in a hotel.' },
  { group: 10, original: 'It is difficult for very old people to have a good quality for life.', corrected: 'It is difficult for very old people to have a good quality of life.' },
  { group: 10, original: 'Many people have been died because of this disease.', corrected: 'Many people have died because of this disease.' },
  { group: 10, original: 'Celebrities have to be aware of the influence they make on young people.', corrected: 'Celebrities have to be aware of the influence they have on young people.' },
  { group: 10, original: 'Advertisement on TV is the best way of increasing your business.', corrected: 'Advertising on TV is the best way of increasing your business.' },

  // Group 11
  { group: 11, original: 'We need to look at factors such as availability of health care.', corrected: 'We need to look at factors such as the availability of health care.' },
  { group: 11, original: 'Everyone need a minimum amount of sleep per night.', corrected: 'Everyone needs a minimum amount of sleep per night.' },
  { group: 11, original: 'Each school has their own counsellor.', corrected: 'Each school has its own counsellor.' },
  { group: 11, original: 'People work with sick and elderly people must be very patient and kind.', corrected: 'People who work with sick and elderly people must be very patient and kind.', alternatives: ['People that work with sick and elderly people must be very patient and kind.'] },
  { group: 11, original: 'Mary was made swallow a large dose of medicine by the nurse.', corrected: 'Mary was made to swallow a large dose of medicine by the nurse.' },
  { group: 11, original: 'I felt very nervous to present my assignment to the class.', corrected: 'I felt very nervous presenting my assignment to the class.' },
  { group: 11, original: 'The party promised to increase investment for education.', corrected: 'The party promised to increase investment in education.' },
  { group: 11, original: 'The landlord complained because we were making too much noisy.', corrected: 'The landlord complained because we were making too much noise.' },
  { group: 11, original: 'We see the impact of religion on dress and customs.', corrected: 'We see the influence of religion on dress and customs.' },
  { group: 11, original: 'Nowdays you need to be sure to read advertisements carefully.', corrected: 'Nowadays you need to be sure to read advertisements carefully.' },

  // Group 12
  { group: 12, original: 'A diet high in cholesterol is bad for heart.', corrected: 'A diet high in cholesterol is bad for the heart.' },
  { group: 12, original: 'The proportion of people living alone have increased.', corrected: 'The proportion of people living alone has increased.' },
  { group: 12, original: 'Message apps allow children to take photos and share it safely with family.', corrected: 'Message apps allow children to take photos and share them safely with family.' },
  { group: 12, original: 'There are many teeanagers do not feel comfortable talking about their problems.', corrected: 'There are many teenagers who do not feel comfortable talking about their problems.', alternatives: ['There are many teenagers that do not feel comfortable talking about their problems.'] },
  { group: 12, original: 'He did not get the job despite he got excellent grades.', corrected: 'He did not get the job despite getting excellent grades.' },
  { group: 12, original: 'Our teacher suggested me to buy a good dictionary.', corrected: 'Our teacher suggested I buy a good dictionary.' },
  { group: 12, original: "There's a porter in reception to help guests their bags.", corrected: "There's a porter in reception to help guests with their bags." },
  { group: 12, original: 'New employees have instructed not to operate the photocopier until they are trained.', corrected: 'New employees have been instructed not to operate the photocopier until they are trained.' },
  { group: 12, original: "I didn't play very good in our last football match.", corrected: "I didn't play very well in our last football match." },
  { group: 12, original: 'The current debate is if immigrants should adopt local customs.', corrected: 'The current debate is whether immigrants should adopt local customs.' },

  // Group 13
  { group: 13, original: "She focused on the role of a family in a child's education.", corrected: "She focused on the role of the family in a child's education." },
  { group: 13, original: 'The number of man studying science has decreased.', corrected: 'The number of men studying science has decreased.' },
  { group: 13, original: 'The company sells specialist software for computer-aided design.', corrected: 'The company sells specialist software for computer-aided design.', correctAsWritten: true },
  { group: 13, original: 'John suggested that we go to a movie.', corrected: 'John suggested that we go to a movie.', correctAsWritten: true },
  { group: 13, original: 'The teacher allowed to talk as long as it was in English.', corrected: 'The teacher allowed us to talk as long as it was in English.', alternatives: ['The teacher allowed talking as long as it was in English.'] },
  { group: 13, original: 'I was happy seeing her when she arrived.', corrected: 'I was happy to see her when she arrived.' },
  { group: 13, original: 'The difference between your essay with mine is that I only answered part of the question.', corrected: 'The difference between your essay and mine is that I only answered part of the question.' },
  { group: 13, original: 'The flight was delayed due to technical reasons.', corrected: 'The flight was delayed due to technical problems.' },
  { group: 13, original: 'We must act quick.', corrected: 'We must act quickly.' },
  { group: 13, original: 'Many people would stop using their cars when public transport was better.', corrected: 'Many people would stop using their cars if public transport was better.' },

  // Group 14
  { group: 14, original: 'All competitors should have equal chance of winning.', corrected: 'All competitors should have an equal chance of winning.' },
  { group: 14, original: 'The amount of traffic on the road is increasing each year.', corrected: 'The amount of traffic on the road is increasing each year.', correctAsWritten: true },
  { group: 14, original: 'Health and educaton are top priorities for the new government.', corrected: 'Health and education are top priorities for the new government.' },
  { group: 14, original: 'There have been big changes in the food we eat and the way we cook them.', corrected: 'There have been big changes in the food we eat and the way we cook it.' },
  { group: 14, original: 'I tried to turn the tap but the water still poured out.', corrected: 'I tried turning the tap but the water still poured out.' },
  { group: 14, original: 'We have to provide doctors the resources they need to do their job.', corrected: 'We have to provide doctors with the resources they need to do their job.' },
  { group: 14, original: 'The survey looked at how much on average people spend for food and drink.', corrected: 'The survey looked at how much on average people spend on food and drink.' },
  { group: 14, original: 'Companies waste heaps of money on advertising.', corrected: 'Companies waste a great deal of money on advertising.' },
  { group: 14, original: 'We need to stop this problem as soon as possible.', corrected: 'We need to solve this problem as soon as possible.' },
  { group: 14, original: 'My brother works in advertising.', corrected: 'My brother works in advertising.', correctAsWritten: true },

  // Group 15
  { group: 15, original: 'The astronauts on the moon had a wonderful view of the earth.', corrected: 'The astronauts on the moon had a wonderful view of the earth.', correctAsWritten: true },
  { group: 15, original: 'At the weekend, my younger brother play video games 8 hours a day.', corrected: 'At the weekend, my younger brother plays video games 8 hours a day.' },
  { group: 15, original: 'Three and a half a billion people watched the ceremony on TV.', corrected: 'Three and a half billion people watched the ceremony on TV.' },
  { group: 15, original: 'I am not used to be away from my family.', corrected: 'I am not used to being away from my family.' },
  { group: 15, original: "Don't forget sending a postcard to your grandmother when you're away.", corrected: "Don't forget to send a postcard to your grandmother when you're away." },
  { group: 15, original: 'The survey hopes to track trends in consumer spending.', corrected: 'The survey hopes to track trends in consumer spending.', correctAsWritten: true },
  { group: 15, original: 'The museum was renovated when we were there, so we could not visit it.', corrected: 'The museum was being renovated when we were there, so we could not visit it.' },
  { group: 15, original: 'Kids today are much more comfortable using technology than older people.', corrected: 'Children today are much more comfortable using technology than older people.' },
  { group: 15, original: 'The pie chart illustrates the percentage of people using different transport.', corrected: 'The pie chart shows the percentage of people using different transport.' },
  { group: 15, original: 'Germany spent 1.5% of GDP on defence. On the contrary, the US, spent 3.2%.', corrected: 'Germany spent 1.5% of GDP on defence. In contrast, the US spent 3.2%.' },

  // Group 16
  { group: 16, original: 'The introduction of computerised systems led to an increase in unemployment.', corrected: 'The introduction of computerised systems led to an increase in unemployment.', correctAsWritten: true },
  { group: 16, original: 'Last year the airline saw a 20% improvement in delays.', corrected: 'Last year the airline saw a 20% improvement in delays.', correctAsWritten: true },
  { group: 16, original: 'Each year, the number of garbages we produce increases.', corrected: 'Each year, the amount of garbage we produce increases.' },
  { group: 16, original: 'I must remember to watch the news tonight.', corrected: 'I must remember to watch the news tonight.', correctAsWritten: true },
  { group: 16, original: "Did you remember buying a present for your cousin's birthday?", corrected: "Did you remember to buy a present for your cousin's birthday?" },
  { group: 16, original: "Let's look at the figures for people between 20 to 30 years old.", corrected: "Let's look at the figures for people between 20 and 30 years old." },
  { group: 16, original: 'Conservationists are worried about the effects of the new railway line for wildlife.', corrected: 'Conservationists are worried about the effects of the new railway line on wildlife.' },
  { group: 16, original: 'The two graphs indicate the total number of men and women enrolled.', corrected: 'The two graphs show the total number of men and women enrolled.' },
  { group: 16, original: 'Children toys are much more sophisticated now than in the past.', corrected: "Children's toys are much more sophisticated now than in the past." },
  { group: 16, original: 'I think they are also right to certain extent.', corrected: 'I think they are also right to a certain extent.' },

  // Group 17
  { group: 17, original: 'We discussed whether universities should charge tuition fees.', corrected: 'We discussed whether universities should charge tuition fees.', correctAsWritten: true },
  { group: 17, original: 'The number of buses on our roads have increased each year.', corrected: 'The number of buses on our roads has increased each year.' },
  { group: 17, original: 'She had two bridesmaids in pink dress.', corrected: 'She had two bridesmaids in pink dresses.' },
  { group: 17, original: 'I tried to turn the tap but it was too old and rusty.', corrected: 'I tried to turn the tap but it was too old and rusty.', correctAsWritten: true },
  { group: 17, original: 'For many young people, going to university is their first taste of independence. They look forward to living away from home and have more freedom.', corrected: 'For many young people, going to university is their first taste of independence. They look forward to living away from home and having more freedom.' },
  { group: 17, original: 'Companies in the US spend more money for research and development.', corrected: 'Companies in the US spend more money on research and development.' },
  { group: 17, original: 'The most popular country for British to visit in 2019 was Spain.', corrected: 'The most popular country for Britons to visit in 2019 was Spain.' },
  { group: 17, original: 'Some people believe it is OK to hit small children.', corrected: 'Some people believe it is acceptable to hit small children.', alternatives: ['Some people believe it is all right to hit small children.'] },
  { group: 17, original: "I looked in the car's boot but I couldn't see a spare tyre.", corrected: "I looked in the boot of the car but I couldn't see a spare tyre." },
  { group: 17, original: 'I am learning for the test.', corrected: 'I am studying for the test.' },

  // Group 18
  { group: 18, original: 'The company agreed to the pay rise.', corrected: 'The company agreed to the pay rise.', correctAsWritten: true },
  { group: 18, original: 'There are a lot of similarity between your country and mine.', corrected: 'There are a lot of similarities between your country and mine.' },
  { group: 18, original: 'How often do you use public tranpsorts?', corrected: 'How often do you use public transport?' },
  { group: 18, original: "The burglar tried openning the window with a knife but couldn't get in.", corrected: "The burglar tried to open the window with a knife but couldn't get in." },
  { group: 18, original: 'They have achieved a lot of progress in improving working conditions.', corrected: 'They have made a lot of progress in improving working conditions.' },
  { group: 18, original: 'There has been an increase of the number of people aged over eighty.', corrected: 'There has been an increase in the number of people aged over eighty.' },
  { group: 18, original: 'Water pollution has a particularly harmful influence on fish.', corrected: 'Water pollution has a particularly harmful effect on fish.' },
  { group: 18, original: 'My boss made me to wear a horrible uniform.', corrected: 'My boss made me wear a horrible uniform.' },
  { group: 18, original: 'The role of student at university level varies greatly from country to country.', corrected: 'The role of the student at university level varies greatly from country to country.' },
  { group: 18, original: 'I missed out a good job promotion as a result of my illness.', corrected: 'I missed out on a good job promotion as a result of my illness.' },

  // Group 19
  { group: 19, original: 'People are used to have internet access on their phone wherever they go.', corrected: 'People are used to having internet access on their phone wherever they go.' },
  { group: 19, original: 'There were already a little furniture in the flat.', corrected: 'There was already a little furniture in the flat.' },
  { group: 19, original: 'The local museum has objects that are more than two thousands years old.', corrected: 'The local museum has objects that are more than two thousand years old.' },
  { group: 19, original: 'There are several factors are important in achieving happiness.', corrected: 'There are several factors that are important in achieving happiness.' },
  { group: 19, original: 'I will never forget to visit the pyramids on our trip to Egypt.', corrected: 'I will never forget visiting the pyramids on our trip to Egypt.' },
  { group: 19, original: 'Sales of some products tend to be seasonal. For example, hot summer weather might lead to a sudden surge of ice cream sales.', corrected: 'Sales of some products tend to be seasonal. For example, hot summer weather might lead to a sudden surge in ice cream sales.' },
  { group: 19, original: 'Researchers observed changes of educational levels.', corrected: 'Researchers observed changes in educational levels.' },
  { group: 19, original: 'My English teacher always made us to write out an essay again if we made a mistake.', corrected: 'My English teacher always made us write out an essay again if we made a mistake.' },
  { group: 19, original: 'In some countries, there are no women members of parliament.', corrected: 'In some countries, there are no female members of parliament.' },
  { group: 19, original: "We're studying about World War I this term.", corrected: "We're learning about World War I this term." },

  // Group 20
  { group: 20, original: "Women's income rose by 31% comparing to only 13% for men.", corrected: "Women's income rose by 31% compared to only 13% for men." },
  { group: 20, original: 'There is a pan of soup and are some bowls in the kitchen.', corrected: 'There is a pan of soup and there are some bowls in the kitchen.' },
  { group: 20, original: 'The new labels provide customers better information about ingredients.', corrected: 'The new labels provide customers with better information about ingredients.' },
  { group: 20, original: 'I have a problem I think you can help me.', corrected: 'I have a problem I think you can help me with.' },
  { group: 20, original: 'There has been a slight rise of the number of men employed.', corrected: 'There has been a slight rise in the number of men employed.' },
]

export const exercises: Exercise[] = source.map((exercise, index) => ({
  id: index + 1,
  ...exercise,
}))
