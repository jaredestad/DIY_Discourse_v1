//
//  filetodb.c
//
//
//  Created by Jared Thomas Estad on 10/21/15.
//
//gcc -o filetodb filetodb.c -I/usr/local/Cellar/mysql/5.6.27/include/mysql -lmysqlclient

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <mysql.h>
#include <my_global.h>

char *filename = "RC_2015-01";
//char *filename = "example_json.txt";


void mysql_handler(char **array)
{
    MYSQL *conn;
    char *server = "localhost";
    char *user = "root";
    char *password = "password";
    char *database = "reddit";
    
    char *insert_query = malloc(20 * 2000);
    //printf("%s\n", array[10]);
    //sprintf(insert_query, "INSERT INTO cinfo(body) VALUES ('%s');", array[10]);
    sprintf(insert_query, "INSERT INTO cinfo(gilded, author_flair_text, author_flair_css_class, retrieved_on, ups, subreddit_id, edited, controversiality, parent_id, subreddit, body, created_utc, downs, score, author, archived, distinguished, id, score_hidden, name, link_id) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s');", array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15], array[16], array[17], array[18], array[19], array[20]);
    printf("%s\n", insert_query);
    conn = mysql_init(NULL);
    if(!mysql_real_connect(conn, server, user, password, database, 0, NULL, 0))
    {
        fprintf(stderr, "%s\n", mysql_error(conn));
        exit(1);
    }
    if(mysql_options(conn, MYSQL_SET_CHARSET_NAME, "utf8") != 0)
    {
        fprintf(stderr, "%s\n", mysql_error(conn));
        exit(1);
    }
    if(mysql_query(conn, insert_query))
    {
        fprintf(stderr, "%s\n", mysql_error(conn));
        exit(1);
    }
    free(insert_query);
    mysql_close(conn);
    
}
void json_parse(FILE *fr){

    int x = 0, SIZE = 100, CATNUM = 21;
    char *cate[] = {"gilded", "author_flair_text", "author_flair_css_class", "retrieved_on", "ups", "subreddit_id", "edited", "controversiality", "parent_id", "subreddit", "body", "created_utc", "downs", "score", "author", "archived", "distinguished", "id", "score_hidden", "name", "link_id"};
    
    char **charact = malloc(sizeof(char*) * CATNUM);
    
    
    int ch = 0;
    while( (ch = fgetc(fr)) != '}' )
    {
        
        char *word = malloc(sizeof(char) * SIZE);
        char *contents = malloc(sizeof(char) * SIZE);
        
        if(ch == '\"')
        {
            int count = 0;
            //parse key word
            while( (ch = fgetc(fr)) != '\"' )
            {
                if(count > SIZE-1)//resize word
                {
                    SIZE = SIZE * 2;
                    word = (char*)realloc(word, SIZE);
                }
                word[count] = ch;// +'0'
                count++;
            }
            if(count > SIZE-1)//resize word
            {
                SIZE = SIZE * 2;
                word = (char*)realloc(word, SIZE);
            }
            word[count] = '\0';
            printf("%s\n", word);
            //parse comment contents/data
            for(x = 0; x < CATNUM; x++)
            {
                if(strcmp(word, cate[x]) == 0)//finds type in array
                {
                    int counter = 0;
                    ch = fgetc(fr);
                    ch = fgetc(fr);
                    if(ch == '\"')//for all strings
                    {
                        int end = 1;
                        int go = 0;
                        while(end != 0)
                        {
                          
                            if(counter > SIZE-1)//resize word
                            {
                                SIZE = SIZE * 2;
                                contents = (char*)realloc(contents, SIZE);
                            }
                            if(go != 1);
                                ch = fgetc(fr);
                            //printf("%c\n", ch);
                            go = 0;
                            if(ch == '\\')
                            {
                                
                                ch = fgetc(fr);
                                if(counter > SIZE-1)//resize word
                                {
                                    SIZE = SIZE * 2;
                                    contents = realloc(contents, SIZE);
                                }
                                
                                if(ch == 'n')
                                {
                                    contents[counter] = '\n';
                                    counter++;
                                }
                                else if(ch == '\"')
                                {
                                    contents[counter] = '"';
                                    counter++;
                                }
                                else if(ch == '\\')
                                {
                                    if(counter > SIZE-1)//resize word
                                    {
                                        SIZE = SIZE * 2;
                                        contents = realloc(contents, SIZE);
                                    }
                                    contents[counter] = '\\';
                                    counter++;
                                    if(counter > SIZE-1)//resize word
                                    {
                                        SIZE = SIZE * 2;
                                        contents = realloc(contents, SIZE);
                                    }
                                    contents[counter] = '\\';
                                    counter++;
                                }
                                else if(ch == 'r')
                                {
                                    //contents[counter] = '\r';
                                    //counter++;
                                }
                                else if(ch == 'b')
                                {
                                    contents[counter] = '\b';
                                    counter++;
                                }
                                else if(ch == 't')
                                {
                                    contents[counter] = '\t';
                                    counter++;
                                }
                                else
                                {
                                    contents[counter] = '\\';
                                    counter++;
                                    if(counter > SIZE-1)//resize word
                                    {
                                        SIZE = SIZE * 2;
                                        contents = realloc(contents, SIZE);
                                    }
                                    contents[counter] = '\\';
                                    counter++;
                                    if(counter > SIZE-1)//resize word
                                    {
                                        SIZE = SIZE * 2;
                                        contents = realloc(contents, SIZE);
                                    }
                                    contents[counter] = ch;
                                    counter++;
                                    go = 1;
                                }
                            }
                            else if(ch != '\"')
                            {
                                if(counter > SIZE-1)//resize word
                                {
                                    SIZE = SIZE * 2;
                                    contents = realloc(contents, SIZE);
                                }
                                if(ch == '\'')
                                {
                                    contents[counter] = '\\';
                                    counter++;
                                }
                                if(counter > SIZE-1)//resize word
                                {
                                    SIZE = SIZE * 2;
                                    contents = realloc(contents, SIZE);
                                }
                                contents[counter] = ch;
                                counter++;
                            }
                            else
                            {
                                end = 0;
                            }
                        }
                        if(counter > SIZE-1)//resize word
                        {
                            SIZE = SIZE * 2;
                            contents = (char*)realloc(contents, SIZE);
                        }
                        contents[counter] = '\0';
                    }
                    else if(isalpha(ch))//checks if ch is a letter
                    {
                        contents[counter] = ch;// + '0'
                        while( (ch = fgetc(fr)) != ',' && ch != '}')
                        {
                            counter++;
                            contents[counter] = ch;
                        }
                        counter++;
                        contents[counter] = '\0';
                    }
                    else if(isdigit(ch) || ch == '-')//checks if ch is a number
                    {
                        contents[counter] = ch;// + '0'
                        while( (ch = fgetc(fr)) != ',' && ch != '}')
                        {
                            counter++;
                            contents[counter] = ch;
                        }
                    }
                    else
                    {
                        printf("ERROR: Uncategorized content.\n");
                    }
                    //printf("Size: %d\n", SIZE);
                    printf("%s\n", contents);
                    charact[x] = malloc(sizeof(char)*SIZE);
                    strcpy(charact[x], contents);
                    SIZE = 100;
                    break;
                }//end if
            }//for CATNUM end
        }//ends if
        //printf("free\n");
        free(contents);
        free(word);
        
        //printf("freed\n");
        if(ch == '}')
            break;
    }//ends while
    mysql_handler(charact);
    for(x = 0; x < CATNUM; x++)
    {
        //printf("%s\n", charact[x]);
        free(charact[x]);
    }
    free(charact);
}
char* resize(int counter, int SIZE, char *alloc)
{
    if(counter > SIZE)
    {
        SIZE = SIZE * 2;
        alloc = (char*)realloc(alloc, SIZE);
    }
    return alloc;
}
int main(void)
{
    FILE *fr = fopen(filename, "r");
    if(fr == NULL)
    {
        printf("File not found.\n");
        exit(EXIT_SUCCESS);
    }
    
    
    
    int ch = 0;
    
    while(!feof(fr))
    {
        ch = fgetc(fr);
        //printf("%c\n", ch);
        if(ch == '{')//beginning of json found
        {
            json_parse(fr);//parse the json
        }
        
        
    }
    
    fclose(fr);
    
}